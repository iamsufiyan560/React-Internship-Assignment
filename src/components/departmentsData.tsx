import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Grid,
  Collapse,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

// Hardcoded department data
const departmentsData = [
  {
    department: "customer_service",
    sub_departments: ["support", "customer_success"],
  },
  {
    department: "design",
    sub_departments: ["graphic_design", "product_design", "web_design"],
  },
];

const DepartmentList: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState<boolean[]>(
    new Array(departmentsData.length).fill(false)
  );

  // Function to handle toggling of checkboxes
  const handleToggle = (item: string) => {
    const currentIndex = selected.indexOf(item);
    const newSelected = [...selected];

    if (currentIndex === -1) {
      newSelected.push(item);
    } else {
      newSelected.splice(currentIndex, 1);
    }

    setSelected(newSelected);
  };

  // Function to handle expanding/collapsing of departments
  const handleClick = (index: number) => {
    const newOpen = [...open];
    newOpen[index] = !open[index];
    setOpen(newOpen);
  };

  // Function to handle selection of all sub-departments of a department
  const handleSelectAll = (department: string, subDepartments: string[]) => {
    const newSelected = [...selected];

    if (subDepartments.every((subDept) => newSelected.includes(subDept))) {
      // All sub-departments are selected, deselect them
      newSelected.splice(
        newSelected.findIndex((item) => item === department),
        1
      );
      newSelected.splice(
        newSelected.findIndex((item) => subDepartments.includes(item)),
        subDepartments.length
      );
    } else {
      // Not all sub-departments are selected, select them
      newSelected.push(department, ...subDepartments);
    }

    setSelected(newSelected);
  };

  // Function to determine if all sub-departments of a department are selected
  const isAllSubDepartmentsSelected = (
    department: string,
    subDepartments: string[]
  ) => {
    return subDepartments.every((subDept) => selected.includes(subDept));
  };

  return (
    <Grid
      container
      direction="column"
      spacing={2}
      bgcolor="lightgray"
      p={2}
      border={8}
      borderColor={"white"}
    >
      {departmentsData.map((dept, index) => (
        <Grid item key={dept.department}>
          <List>
            <ListItem onClick={() => handleClick(index)} disableGutters>
              <ListItemIcon>
                {open[index] ? (
                  <ExpandLess sx={{ color: "white", fontSize: 40 }} />
                ) : (
                  <ExpandMore sx={{ color: "white", fontSize: 40 }} />
                )}
              </ListItemIcon>
              <ListItemText
                primary={dept.department}
                sx={{
                  "&:hover": {
                    color: "red", // Example hover color
                    cursor: "pointer",
                  },
                }}
              />
              <Checkbox
                edge="end"
                checked={isAllSubDepartmentsSelected(
                  dept.department,
                  dept.sub_departments
                )}
                onClick={(event) => event.stopPropagation()} // Prevent list item click propagation
                onChange={() =>
                  handleSelectAll(dept.department, dept.sub_departments)
                }
              />
            </ListItem>
            <Collapse in={open[index]} timeout="auto" unmountOnExit>
              <List disablePadding>
                {dept.sub_departments.map((subDept) => (
                  <ListItem
                    key={subDept}
                    onClick={() => handleToggle(subDept)}
                    disableGutters
                    style={{ paddingLeft: 32 }}
                    // Adjust indentation for sub-departments
                    sx={{
                      "&:hover": {
                        color: "red", // Example hover color
                        cursor: "pointer",
                      },
                    }}
                  >
                    <ListItemIcon />
                    <ListItemText primary={subDept} />
                    <Checkbox
                      edge="end"
                      checked={selected.includes(subDept)}
                      onClick={(event) => event.stopPropagation()} // Prevent list item click propagation
                      onChange={() => handleToggle(subDept)}
                    />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </List>
        </Grid>
      ))}
    </Grid>
  );
};

export default DepartmentList;
