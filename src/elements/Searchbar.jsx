import React from "react";

export function filterData(data, search) {
    return data.filter((item) => {
      return (
        item.ratings_average
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.author_name.toLowerCase().includes(search.toLowerCase()) ||
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.first_publish_year
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.subject.toLowerCase().includes(search.toLowerCase()) ||
        item.author_birth_date.toLowerCase().includes(search.toLowerCase()) ||
        item.author_top_work.toLowerCase().includes(search.toLowerCase())
      );
    });
  }
  