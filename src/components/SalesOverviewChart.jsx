/* eslint-disable no-unused-vars */
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { div } from "framer-motion/client";
import { useState } from "react";

const salesDataMonth = [
	{ name: "Jul", sales: 4200 },
	{ name: "Aug", sales: 3800 },
	{ name: "Sep", sales: 5100 },
	{ name: "Oct", sales: 4600 },
	{ name: "Nov", sales: 5400 },
	{ name: "Dec", sales: 7200 },
	{ name: "Jan", sales: 6100 },
	{ name: "Feb", sales: 5900 },
	{ name: "Mar", sales: 6800 },
	{ name: "Apr", sales: 6300 },
	{ name: "May", sales: 7100 },
	{ name: "Jun", sales: 7500 },
];

const salesDataYear = [
	{ name: "2024", sales: 42000 },
	{ name: "2025", sales: 38000 },
	{ name: "2026", sales: 51000 },
];

const salesDataWeek = [
	{ name: "Mon", sales: 1200 },
	{ name: "Tue", sales: 1500 },
	{ name: "Wed", sales: 1300 },
	{ name: "Thu", sales: 1600 },
];



const SalesOverviewChart = () => {
	const [salesData, setSalesData] = useState(salesDataMonth);
	const [data, setData] = useState("month");

	function handleChangeData(data) {
		if(data === "month") {
			setSalesData(salesDataYear);
			console.log(data);
			setData('year');
			console.log(data);
		} else if (data === "year") {
			setSalesData(salesDataWeek);
			console.log(data);
			setData('week');
			console.log(data);
		} else if (data === "week") {
			setSalesData(salesDataMonth);
			console.log(data);
			setData('month');
			console.log(data);
		}
	}
	return (
		<div>
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<h2 className='text-lg font-medium mb-4 text-gray-100'>Sales Overview</h2>

			<div className='h-80'>
				<ResponsiveContainer width={"100%"} height={"100%"}>
					<LineChart data={salesData}>
						<CartesianGrid strokeDasharray='3 3' stroke='#4B5563' />
						<XAxis dataKey={"name"} stroke='#9ca3af' />
						<YAxis stroke='#9ca3af' />
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Line
							type='monotone'
							dataKey='sales'
							stroke='#6366F1'
							strokeWidth={3}
							dot={{ fill: "#6366F1", strokeWidth: 2, r: 6 }}
							activeDot={{ r: 8, strokeWidth: 2 }}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
		<button onClick={() => handleChangeData(data)} className="bg-red-500 cursor-pointer mt-5 rounded-2xl p-4 hover:bg-red-600 transition-all duration-800 ease-in-out font-bold ">Change Data</button>
		</div>
		
	);
};
export default SalesOverviewChart;