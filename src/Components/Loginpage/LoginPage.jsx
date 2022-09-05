import React from 'react'
import GoogleLogin from '../GoogleLogin'
export default function LoginPage() {
  return (
    <>
      <div className="flex items-center justify-items-start mt-6 ml-6 h-12 w-10 "><img src="/zittel1.png" alt="" />
        <span className="text-xl font-medium ml-2">Zettel</span>
      </div>
      <div className="w-full mt-4 border-b-2  border-grey-100 "/>
       <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className=" text-center text-6xl font-bold tracking-tight text-gray-900">
              Log in
            </h2>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <GoogleLogin />
            <div className=" border-b-2  border-grey-100  "/>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-rose-50 py-2 px-4 text-lg font-medium text-rose-500 hover:bg-rose-50 focus:outline-none focus:ring-2 focus:bg-rose-50 focus:ring-offset-2"
              >
                Continue with email
              </button>
            </div>
          </form>
        </div>
      </div>
    </>  
  )
}
