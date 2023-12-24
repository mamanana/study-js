import { ID, Query } from 'appwrite'
import { INewPost, INewUser } from '@/type'
import { account, appwriteConfig, avatars, databases, storage } from './config'

export async function createUserAccount(user: INewUser) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        )

        if(!newAccount) throw Error

        const avatarUrl = avatars.getInitials(user.name)

        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,    
            username: user.username,
            imageUrl: avatarUrl
        })  

        return newUser 
    } catch(e) {
        console.log(e)
        return e
    }
}

export async function saveUserToDB(user: {
    accountId: string,
    name: string,
    email: string,    
    username: string,
    imageUrl?: URL
}) {
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user
        )
        
        return newUser
    } catch (e) {
        console.log(e)
    }
}

export async function signInAccount(user: { email: string, password: string }) {
    try {
        const session = await account.createEmailSession(user.email, user.password)

        return session
    } catch(e) {
        console.log(e)
    }
}

export async function signOutAccount() {
    try {
        const session = await account.deleteSession('current')

        return session
    } catch(e) {
        console.log(e)
    }
}


export async function getCurrentUser() {
    try {
        const currentAccount =  await account.get()

        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currentUser) throw Error

        return currentUser.documents[0]
    } catch(e) {
        console.log(e)
    }
}

export async function createPost(post: INewPost) {
    try {
        const uploadedFile = await uploadFile(post.file[0])

        if(!uploadedFile) throw Error

        const fileUrl = getFileReview(uploadedFile.$id)

        if(!fileUrl) {
            await deleteFile(uploadedFile.$id)
            throw Error
        }   

        // Convert tags in an array
        const tags = post.tags?.replace(/ /g, '').split(',') || []

        // Save post to database
        const newPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            ID.unique(),
            {
                creator: post.userId,
                caption: post.caption,
                imageUrl: fileUrl,
                imageId: uploadedFile.$id,
                location: post.location,
                tags: tags
            }
        )

        if(!newPost) {
            await deleteFile(uploadedFile.$id)
            throw Error;
        }

        return newPost
    } catch (e) {
        console.log(e)
    }
}

export async function uploadFile(file: File) {
    try {
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            file
        )

        return uploadedFile
    } catch (e) {
        console.log(e)
    }
}

export function getFileReview(fileId: string) {
    try {
        const fileUrl = storage.getFilePreview(
            appwriteConfig.storageId,
            fileId,
            2000,
            2000,
            "top",
            100
        )

        return fileUrl
    } catch (e) {
        console.log(e)
    }
}

export async function deleteFile(fileId: string) {
    try {
        await storage.deleteFile(appwriteConfig.storageId, fileId)

        return { status: 'ok' }
    } catch (e) {
        console.log(e)
    }
}

export async function getRecentPosts() {
    const posts = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        [Query.orderDesc('$createdAt'), Query.limit(20)]
    )

    if(!posts) throw Error;
    
    return posts
}

export async function likePost(postId: string, likeArray: string[]) {
    try {   
        const updatedPost = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            postId,
            {
                likes: likeArray,
                
            }
        )

        if(!updatedPost) throw Error

        return updatedPost
    } catch (e) {
        console.log(e)
    }
}

export async function savePost(postId: string, userId: string) {
    try {   
        const updatedPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.savesCollectionId,
            ID.unique(),
            {
                user: userId,
                post: postId,
            }
        )

        if(!updatedPost) throw Error

        return updatedPost
    } catch (e) {
        console.log(e)
    }
}

export async function deleteSavedPost(savedRecordId: string) {
    try {   
        const statusCode = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.savesCollectionId,
            savedRecordId
        )   

        if(!statusCode) throw Error

        return statusCode
    } catch (e) {
        console.log(e)
    }
}