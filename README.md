# Example application using [`iron-session`](https://github.com/vvo/iron-session) as a middleware authentication.

## Known issues:
- `next: 12.0.5+` will not unseal the cookie properly and always returns an empty object from the `unsealData` function of `iron-session`.
- As far as I know there is no way of passing data from the middleware to static pages in NextJS, please correct me if that is not the case.
- The middleware may run multiple times per page load, you can resolve that with some conditions in your middleware.
