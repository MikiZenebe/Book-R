import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const bookData = [
  {
    id: 1,
    number: 6465,
    name: "Derto Gada",
    status: "Rented",
    price: "40 Birr",
  },
  {
    id: 2,
    number: 6465,
    name: "Fikr Eske Mekabir",
    status: "Rented",
    price: "40 Birr",
  },
  {
    id: 3,
    number: 6465,
    name: "The Power of Now",
    status: "Rented",
    price: "40 Birr",
  },
  // Add more rows here
];

const BookStatus = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Live Book Status
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>Book No.</TableCell>
                <TableCell>Book Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookData.map((book) => (
                <TableRow key={book.id}>
                  <TableCell>{book.id}</TableCell>
                  <TableCell>{book.number}</TableCell>
                  <TableCell>{book.name}</TableCell>
                  <TableCell>{book.status}</TableCell>
                  <TableCell>{book.price}</TableCell>
                  <TableCell>
                    <IconButton size="small" color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" color="secondary">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default BookStatus;
