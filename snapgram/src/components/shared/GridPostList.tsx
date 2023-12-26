import { useUserContext } from '@/context/AuthContext'
import { Models } from 'appwrite'
import { Link } from 'react-router-dom'
import PostStars from './PostStars'

type GridPostListProps = {
    posts: Models.Document[],
    showUser?: boolean,
    showStar?: boolean
}

const GridPostList = ({ posts, showUser = true, showStar = true }: GridPostListProps) => {
    const { user } = useUserContext()
  return (
    <ul className='grid-container'>
        {posts.map((post) => (
            <li key={post.$id} className='relative min-w-80 h-80'>
                <Link to={`/posts/${post.$id}`} className='grid-post_llink'
                >
                    <img src={post.imageUrl} alt="post" className='h-full w-full object-cover' />
                </Link>

                <div className='grid-post_user'>
                    {showUser && (
                        <div className='flex item-center justify-start gap-2 flex-1'>
                            <img src={post.creator.imageUrl} alt="creator" className='h-8 w-8 rounded-full' />
                            <p className='line-champ-1'>{post.creator.name}</p>
                        </div>
                    )}
                    {showStar && <PostStars post={post} userId={user.id} />}
                </div>
            </li>
        ))}
    </ul>
  )
}

export default GridPostList