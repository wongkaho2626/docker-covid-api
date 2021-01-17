const express = require('express');
const app = express();
const fs = require('fs');
const axios = require('axios');
const csvtojson = require('csvtojson');

const server = require('http').Server(app);
const port = process.env.PORT || 3000;

app.get('/', function(req, res) {
  res.send("Hello world");
});

app.get('/api/1.0/covid19/cases', (req, res) => {
	axios({
		method: 'get',
		url: 'http://www.chp.gov.hk/files/misc/enhanced_sur_covid_19_eng.csv',
	})
	.then(async (response) => {
		let data = response.data;
		let path = './cases.csv';
		fs.writeFileSync(path, data);

		const jsonArray = await csvtojson().fromFile(path);
		res.send(jsonArray);
	})
	.catch(() => {
		res.status(500)
  		res.send('error')
	})
});

app.get('/api/1.0/covid19/building', (req, res) => {
	axios({
		method: 'get',
		url: 'http://www.chp.gov.hk/files/misc/building_list_eng.csv',
	})
	.then(async (response) => {
		let data = response.data;
		let path = './building.csv';
		fs.writeFileSync(path, data);

		const jsonArray = await csvtojson().fromFile(path);
		res.send(jsonArray);
	})
	.catch(() => {
		res.status(500)
  		res.send('error')
	})
});

app.get('/api/1.0/covid19/statistics', (req, res) => {
	axios({
		method: 'get',
		url: 'http://www.chp.gov.hk/files/misc/latest_situation_of_reported_cases_covid_19_eng.csv',
	})
	.then(async (response) => {
		let data = response.data;
		let path = './statistics.csv';
		fs.writeFileSync(path, data);

		const jsonArray = await csvtojson().fromFile(path);
		res.send(jsonArray);
	})
	.catch(() => {
		res.status(500)
  		res.send('error')
	})
});

app.get('/api/1.0/covid19/transport', (req, res) => {
	axios({
		method: 'get',
		url: 'http://www.chp.gov.hk/files/misc/flights_trains_list_eng.csv',
	})
	.then(async (response) => {
		let data = response.data;
		let path = './transport.csv';
		fs.writeFileSync(path, data);

		const jsonArray = await csvtojson().fromFile(path);
		res.send(jsonArray);
	})
	.catch(() => {
		res.status(500)
  		res.send('error')
	})
});

server.listen(port, function() {
  console.log(`listening on port ${port}`);
});
