import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'

const IndexPage = ({ data }) => {
  const posts = data.allEventsJson.edges
  return (
    <Layout>
      <h1>Events</h1>

      {posts.map(({node}) => (
        <article key={node.id}>
          <h1>
            <Link to={`events/${node.id}`}>{node.title}</Link>
          </h1>

          <time dateTime={node.date}>
            <span>{node.day}</span> - <span>{node.month}</span> - <span>{node.year}</span>
          </time>
        </article>
      ))}
    </Layout>
  )
}

export default IndexPage

export const IndexPageQuery = graphql`
  query {
    allEventsJson
      #here I was hoping to filter all past events
      #(filter: { date:{ ne: { date }}})
    {
      edges {
        node {
          id
          title
          date(formatString: "DD-MM-YYYY")
          month: date(formatString: "MMM")
          day: date(formatString: "DD")
          year: date(formatString: "YYYY")
        }
      }
    }
  }
`
