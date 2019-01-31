/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')

/**
 * @param graphql
 */
const makeRequest = (graphql, request) =>
  new Promise((resolve, reject) => {
    resolve(
      graphql(request).then(result => {
        if (result.errors) {
          reject(new Error(result.errors))
        }

        return result
      })
    )
  })

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  /**
   * @description creates all event-pages
   * @todo filter out all events with past dates from today
   */
  const getAllEvents = makeRequest(
    graphql,
    `
  {
    allEventsJson {
      edges {
        node {
          id
          title
          date
        }
      }
    }
  }
  `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    const posts = result.data.allEventsJson.edges

    posts.forEach(({ node }) => {
      createPage({
        path: `/events/${node.id}`,
        component: path.resolve(`src/templates/event-page.js`),
        context: {
          id: node.id,
        },
      })
    })

    return Promise.all([getAllEvents])
  })
}
