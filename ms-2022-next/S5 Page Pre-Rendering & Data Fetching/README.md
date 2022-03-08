# Page Pre-rendering & Data Fetching

## Two forms of pre-rendering

- Static Generation (recommended)
- Sever-side Rendering

## Static Generation

### Normal cases

1. Pre-generate a page (with data prepared on the server-side) during build time
2. Pages are prepared ahead to time and can be ached by the sever / CDN serving the app
3. getStaticProps(context): will not be included in the code bundle that send back to the client. Can be only added in page file

### Incremental static generation (ISR)

- Pre-generate Page
- Re-generate it on every request, at most every x seconds
  - Serve "old" page if re-generation is not needed yet.
  - Generate, store and serve "new" page otherwise.

### Pre-render the dynamic pages

- Pre-generate Paths(Routes)
  1. Dynamic pages ([id.js] etc) don't just need data: You also need to know which [id] values will be available
  2. Multiple concrete [id] page instances(e.g. id=1, id=2) are pre-generated

## Sever-side Rendering

- Sometimes, you need to pre-render for every request OR you need access to the request object (e.g. for cookies)
- getServerSideProps(): clash with above method.

## Client-side Data Fetching (not pre-rendering)

- Some data doesn't need to be pre-rendered
  - Data changing with high frequency
  - Highly user-specific data (e.g last orders in an online shop)
  - Partial data (e.g. data that's only used on a part of page.)
- Pre-fetching the data for page generation might not work or be required
- "Traditional" client-side data fetching (useEffect() with fetch())

### They could also combined together to optimise performance, see last-sales.js
