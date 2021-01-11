var express = require('express')
var router = express.Router()

const axios = require("axios").default

const axiosInstance = axios.create({
  baseURL: 'https://steppschuh-json-porn-v1.p.rapidapi.com/',
  timeout: 10000,
  headers: {
    'x-rapidapi-key': '81e1dac4f9msh12a5850f1f829cap1d9079jsnb840ed1c0e06',
    'x-rapidapi-host': 'steppschuh-json-porn-v1.p.rapidapi.com'
  }
});

/* GET videos */
router.get('/search', async function(req, res) {
  const { q } = req.query

  const options = {
    method: 'GET',
    url: '/search/',
    params: { 
      q: q ? q : ''
    },
  }

  axiosInstance.request(options).then(function (response) {
    console.log(response.data)
    res.json(response.data)
  }).catch(function (error) {
    console.error(error)
  })
});

/* GET actors */
router.get('/actors', async function(req, res) {
  const { name, page, count } = req.query

  const options = {
    method: 'GET',
    url: '/actors/',
    params: {
      includeImages: true,
      count,
      offset: Number((Number(page) * Number(count))) - Number(count),
      actorName: name
    },
  }

  axiosInstance.request(options).then(function (response) {
    console.log(response.data)
    res.json(response.data)
  }).catch(function (error) {
    console.error(error)
  })
});

/* GET producers */
router.get('/producers', async function(req, res) {
  const { name, page, count, sort } = req.query

  const options = {
    method: 'GET',
    url: '/producers/',
    params: {
      includePorn: true,
      count,
      sort,
      offset: Number((Number(page) * Number(count))) - Number(count),
      producerName: name,
    },
  }

  axiosInstance.request(options).then(function (response) {
    console.log(response.data)
    res.json(response.data)
  }).catch(function (error) {
    console.error(error)
  })
});

/* GET porn */
router.get('/porn', async function(req, res) {
  const { page, count, sort, type, genre, actor, producer, porn } = req.query
  const params = {
    includePorn: true,
    count,
    sort,
    pornType: type,
    offset: Number((Number(page) * Number(count))) - Number(count),
    pornId: porn
  }

  if(genre) {
    params.genreId = genre
  }
  if(actor) {
    params.actorId = actor
  }
  if(producer) {
    params.producerId = producer
  }
  if(type) {
    params.pornType = type
  }

  const options = {
    method: 'GET',
    url: '/porn/',
    params
  }

  axiosInstance.request(options).then(function (response) {
    console.log(response.data)
    res.json(response.data)
  }).catch(function (error) {
    console.error(error)
  })
});



module.exports = router;
