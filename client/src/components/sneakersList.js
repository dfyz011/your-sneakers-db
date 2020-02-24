import React from "react";
import { Sneaker } from "./sneakerComponent";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const SneakersList = ({ sneakers, onDelete, onUpdate }) => (
	<TableContainer border={1} component={Paper}>
		<Table size="small">
			<TableHead>
				<TableRow>
					<TableCell>Модель</TableCell>
					<TableCell>Фирма</TableCell>
					<TableCell></TableCell>
				</TableRow>
			</TableHead>
		<TableBody>
			{Array.from(sneakers).map(sneaker => (
				<Sneaker
					key={sneaker._id}
					{...sneaker}
					onDelete={onDelete}
					onUpdate={onUpdate}
				/>
			))}
		</TableBody>
		</Table>
	</TableContainer>
);

export default SneakersList;
