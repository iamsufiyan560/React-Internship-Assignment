import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import DepartmentList from "./departmentsData";

const Table: React.FC = () => {
  interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
  }

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const columns: GridColDef[] = [
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
      minWidth: 100,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      minWidth: 50,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "title",
      headerName: "Title",
      flex: 2,
      minWidth: 200,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "body",
      headerName: "Body",
      flex: 3,
      minWidth: 300,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
  ];

  return (
    <>
      <div style={{ height: 600, width: "100%" }} className="p-8">
        <DataGrid
          rows={posts}
          columns={columns}
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#0a092f",
              color: "white",
              marginTop: "8",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              color: "white",
            },
            "& .MuiDataGrid-cell": {
              color: "white",
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "#0a092f",
              color: "white",
            },
            "& .MuiTablePagination-root": {
              color: "white",
            },
            "& .super-app-theme--header": {
              backgroundColor: "#0a092f",
            },
            "& .MuiButtonBase-root.MuiIconButton-root": {
              color: "white",
            },
            "& .MuiDataGrid-sortIcon": {
              color: "white",
            },
            "& .MuiSelect-icon": {
              color: "white",
            },
            "& .MuiSelect-select": {
              color: "white",
            },
            "& .MuiMenuItem-root": {
              color: "white",
            },
            "& .MuiSvgIcon-root": {
              color: "white",
            },
            "& .MuiTablePagination-selectIcon": {
              color: "white",
            },
            "& .MuiToolbar-root": {
              color: "white",
            },
            boxShadow: 2,
            border: 4,
            borderColor: "gray",
            "& .MuiDataGrid-cell:hover": {
              color: "primary.main",
            },
          }}
        />
      </div>

      <div className="pt-16 w-fit p-16">
        <DepartmentList />
      </div>
    </>
  );
};

export default Table;
