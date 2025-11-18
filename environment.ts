/* Following Sanity best practice for environment variables */
/* 
"recommend having a single file that re-exports environment variables 
to the rest of your code" 
*/
/* see docs: https://www.sanity.io/docs/studio/environment-variables */
const projectId = process.env.PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.PUBLIC_SANITY_DATASET!;
export { projectId, dataset };