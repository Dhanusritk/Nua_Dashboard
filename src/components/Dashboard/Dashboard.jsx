import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import "./Dashboard.css";
import { CSVLink } from "react-csv";
import axios from "axios";
import { filterData } from "../../elements/Searchbar";
import ExportButton from "../../elements/ExportButton/ExportButton";
import Sidebar from "../Sidebar/Sidebar";
import { SidebarItem } from "../Sidebar/Sidebar";
import { LayoutDashboard, LogIn, UserRoundPlus } from "lucide-react";
import Loader from "../../elements/Loader/Loader"; // Import the Loader component

export default function Dashboard() {
  const columns = [
    {
      name: "Ratings Average",
      selector: (row) => row.ratings_average,
      cell: (row) => (
        <EditableCell
          value={row.ratings_average}
          row={row}
          column="ratings_average"
          onSave={handleSave}
        />
      ),
      sortable: true,
      width: "150px",
    },
    {
      name: "Author Name",
      selector: (row) => row.author_name,
      cell: (row) => (
        <EditableCell
          value={row.author_name}
          row={row}
          column="author_name"
          onSave={handleSave}
        />
      ),
      sortable: true,
      width: "200px",
    },
    {
      name: "Title",
      selector: (row) => row.title,
      cell: (row) => (
        <EditableCell
          value={row.title}
          row={row}
          column="title"
          onSave={handleSave}
        />
      ),
      sortable: true,
      width: "250px",
    },
    {
      name: "First Publish Year",
      selector: (row) => row.first_publish_year,
      cell: (row) => (
        <EditableCell
          value={row.first_publish_year}
          row={row}
          column="first_publish_year"
          onSave={handleSave}
        />
      ),
      sortable: true,
      width: "150px",
    },
    {
      name: "Subject",
      selector: (row) => row.subject,
      cell: (row) => (
        <EditableCell
          value={row.subject}
          row={row}
          column="subject"
          onSave={handleSave}
        />
      ),
      sortable: true,
      width: "200px",
    },
    {
      name: "Author Birth Date",
      selector: (row) => row.author_birth_date,
      cell: (row) => (
        <EditableCell
          value={row.author_birth_date}
          row={row}
          column="author_birth_date"
          onSave={handleSave}
        />
      ),
      sortable: true,
      width: "150px",
    },
    {
      name: "Author Top Work",
      selector: (row) => row.author_top_work,
      cell: (row) => (
        <EditableCell
          value={row.author_top_work}
          row={row}
          column="author_top_work"
          onSave={handleSave}
        />
      ),
      sortable: true,
      width: "200px",
    },
  ];

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    const genres = [
      "romance",
      "science_fiction",
      "fantasy",
      "mystery",
      "horror",
      "historical_fiction",
      "nonfiction",
      "thriller",
      // Add more genres as needed
    ];

    const fetchBooks = async () => {
      try {
        const genrePromises = genres.map((genre) =>
          axios.get(`https://openlibrary.org/subjects/${genre}.json`)
        );

        const responses = await Promise.all(genrePromises);

        const works = responses.flatMap((response) => response.data.works);

        const bookData = await Promise.all(
          works.map(async (work) => {
            const authorKey = work.authors[0].key;
            const authorResponse = await axios.get(
              `https://openlibrary.org${authorKey}.json`
            );
            const authorWorksResponse = await axios.get(
              `https://openlibrary.org${authorKey}/works.json`
            );

            return {
              id: `${work.title}-${authorResponse.data.name}`, // Unique identifier
              ratings_average: work.rating ? work.rating.average : "N/A",
              author_name: authorResponse.data.name,
              title: work.title,
              first_publish_year: work.first_publish_year,
              subject: work.subject ? work.subject[0] : "N/A",
              author_birth_date: authorResponse.data.birth_date || "N/A",
              author_top_work: authorWorksResponse.data.entries[0]
                ? authorWorksResponse.data.entries[0].title
                : "N/A",
            };
          })
        );

        setData(bookData);
        setFilter(bookData);
      } catch (error) {
        console.error("Error fetching data from Open Library API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    const result = filterData(data, search);
    setFilter(result);
  }, [search, data]);

  useEffect(() => {
    const headerElement = document.querySelector(".container header");
    if (headerElement) {
      headerElement.style.display = "none";
    }
  }, []);

  useEffect(() => {
    // Wait until the component is fully rendered
    const hideHeader = () => {
      const headers = document.querySelectorAll(".custom-data-table thead");
      headers.forEach((header) => {
        header.style.display = "none";
      });
    };

    // Call hideHeader once the component is fully rendered
    hideHeader();
  }, [data]);

  const handleSave = (row, column, value) => {
    const updatedData = data.map((item) =>
      item.id === row.id ? { ...item, [column]: value } : item
    );
    setData(updatedData);
    setFilter(updatedData);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar-container">
        <Sidebar>
          <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" />
          <Link to='/login'><SidebarItem icon={<LogIn size={20} />} text="Login" /></Link>
          <Link to='/signup'><SidebarItem icon={<UserRoundPlus size={20} />} text="Signup" /></Link>
        </Sidebar>
      </div>

      <div className="content-container">
        {/* App Bar */}
        <div className="app-bar">
          <div className="title">Literary Lounge</div>
          <div className="search-container">
            <input
              type="text"
              className="w-25 form-control"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="export-buttons">
              <button
                onClick={() => {
                  const jsonContent = JSON.stringify(data);
                  const blob = new Blob([jsonContent], {
                    type: "application/json",
                  });
                  const url = URL.createObjectURL(blob);
                  const link = document.createElement("a");
                  link.href = url;
                  link.setAttribute("download", "logData.json");
                  document.body.appendChild(link);
                  link.click();
                }}
              >
                <ExportButton label={"Export to JSON"} />
              </button>
              <button>
                <CSVLink data={data} filename={"logData.csv"}>
                  <ExportButton label={"Export to CSV"} />
                </CSVLink>
              </button>
            </div>
          </div>
        </div>

        {/* Log Table with Loader */}
        <div className="log-table-container">
          {/* Display loader if data is still loading */}
          {loading ? (
            <div
              className="
            loader-container"
            >
              <Loader />
            </div>
          ) : (
            <DataTable
              className="custom-data-table"
              columns={columns}
              data={filter}
              pagination
              paginationPerPage={10}
              paginationRowsPerPageOptions={[10, 20, 30, 50]}
              selectableRows
              fixedHeader={false}
              selectableRowsHighlight
              highlightOnHover
              subHeader
              subHeaderAlign="right"
              defaultSortField="title"
              defaultSortAsc={true}
              noHeader={true} // Ensure noHeader is set to true
            />
          )}
        </div>
      </div>
    </div>
  );
}

const EditableCell = ({ value, row, column, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onSave(row, column, editValue);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      onSave(row, column, editValue);
    }
  };

  return isEditing ? (
    <input
      type="text"
      value={editValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyPress={handleKeyPress}
      autoFocus
    />
  ) : (
    <div onDoubleClick={handleDoubleClick}>{value}</div>
  );
};
