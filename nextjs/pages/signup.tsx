import React from "react";
import { Form } from "informed";
import { useRegister } from "@/talons/Customer/useRegister";
import { validConfirmPassword, validatePassword, validateEmail } from '@/untils/formValidators'
import combine from '@/untils/combineValidators'
import Input from "@/components/TextInput";

const Register = () => {
  const talonProps = useRegister();

  const { handleSubmit } = talonProps;

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
          Get started today
        </h1>
        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati
          sunt dolores deleniti inventore quaerat mollitia?
        </p>
        <Form
          className="mt-6 mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          onSubmit={handleSubmit}
        >
          <p className="text-center text-lg font-medium">
            Sign in to your account
          </p>
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <div>
              <Input
                type="text"
                name="email"
                className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                placeholder="Enter email"
                required
                validate={validateEmail}
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="sr-only">
              Firstname
            </label>
            <div>
              <Input
                type="text"
                name="firstname"
                className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                placeholder="Enter firstname"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="sr-only">
              Lastname
            </label>
            <div>
              <Input
                type="text"
                name="lastname"
                className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                placeholder="Enter lastname"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div>
              <Input
                name="password"
                type="password"
                className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                placeholder="Enter password"
                validate={validatePassword}
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Repassword
            </label>
            <div>
              <Input
                name="repassword"
                type="password"
                className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                placeholder="Reenter password"
                required
                validate={combine([[validConfirmPassword, 'password']])}
              />
            </div>
          </div>
          <button
            type="submit"
            className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
          >
            Sign up
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Register;
