import React from "react"
import { render } from "@testing-library/react"
import { useStaticQuery } from "gatsby"
import BlogIndex from "../index"

describe("BlogIndex component", () => {
  beforeEach(() => {
    useStaticQuery.mockReturnValue({
      site: {
        siteMetadata: {
          title: `Gatsby Starter Blog`,
          description: `A starter blog demonstrating what Gatsby can do.`,
          social: {
            twitter: `kylemathews`,
          },
        },
      },
    })
  })

  it("renders the tests correctly", async () => {
    const mockData = {
      site: {
        siteMetadata: {
          author: "John Doe",
        },
      },
      allMarkdownRemark: {
        nodes: [
          {
            excerpt: "This is my first excerpt",
            fields: {
              slug: "first-slug",
            },
            frontmatter: {
              date: "Nov 11, 2020",
              title: "My awesome first blog post",
              description: "My awesome first blog description",
            },
          },
          {
            excerpt: "This is my second excerpt",
            fields: {
              slug: "second-slug",
            },
            frontmatter: {
              date: "Nov 12, 2020",
              title: "My awesome second blog post",
              description: "My awesome second blog description",
            },
          },
        ],
      },
    }

    const { getByTestId } = render(
      <BlogIndex data={mockData} location={window.location} />
    )
    const { nodes } = mockData.allMarkdownRemark
    const post1 = "first-slug-link"
    const post2 = "second-slug-desc"

    expect(getByTestId(post1)).toHaveTextContent(nodes[0].frontmatter.title)
    expect(getByTestId(post2)).toHaveTextContent(
      nodes[1].frontmatter.description
    )
    expect(nodes.length).toEqual(2)
  })
})
