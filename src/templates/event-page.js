import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

const EventPage = ({ data: { eventsJson } }) => {
  const { title, date, day, month } = eventsJson
  return (
    <Layout>
      <article>
        <h1>{title}</h1>
        <time dateTime={date}>
          <span>{day}</span>
          <span>{month}</span>
        </time>
      </article>
    </Layout>
  )
}

export default EventPage

export const EventPageQuery = graphql`
  query($id: String!) {
    eventsJson(id: { eq: $id }) {
      id
      title
      date(formatString: "DD-MM-YYYY")
      month: date(formatString: "MMM")
      day: date(formatString: "DD")
    }
  }
`
