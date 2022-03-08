import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ColStyles = styled.div`
  .heading {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }
  li {
    margin-bottom: 1rem;
  }
  a {
    font-size: 1rem;
  }
`;

export default function FooterCol({
  heading = "heading",
  links = [
    {
      type: "Links",
      title: "Home",
      path: "/",
    },
  ],
}) {
  return (
    <ColStyles>
      <h1 className="heading">{heading}</h1>
      <ul>
        {links.map((item, index) => (
          <li key={index}>
            {
              <a href={item.path} target="_blank" rel="noreferrer">
                {item.title}
              </a>
            }
          </li>
        ))}
      </ul>
    </ColStyles>
  );
}
