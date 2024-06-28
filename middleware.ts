import {clerkMiddleware} from '@clerk/nextjs/server';

export default clerkMiddleware({
  publicRoutes: ['/api/uploadthing'],
  debug: process.env.NODE_ENV === 'development', // Enable debug mode in development
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
