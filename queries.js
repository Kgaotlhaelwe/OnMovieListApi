const Pool = require('pg').Pool
const pool = new Pool({
  user:"user",
  host: 'localhost',
  database: 'MovieAppDb',
  password: 'password',
  port: 5432,
  
})

const getMovies = (request, response) => {
  pool.query('SELECT * FROM movies ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const AddMovie = (request, response) => {
    const { title , description , release_date , image } = request.body
  
    pool.query('INSERT INTO movies (title, description , release_date , image) VALUES ($1, $2 , $3, $4 )', [title ,description,release_date,image], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Movie added successfully `)
    })
  }



  const updateMovie = (request, response) => {
    const id = parseInt(request.params.id)
    const { title, description , release_date , image } = request.body
  
    pool.query(
      'UPDATE movies SET title = $1, description = $2  , release_date = $3 , image = $4 WHERE id = $5',
      [title, description, release_date , image, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`updated Successfully`)
      }
    )
  }

  const deleteMovie = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM movies WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Movie deleted successfully`)
    })
  }


  module.exports = {
      AddMovie ,
      updateMovie ,
      deleteMovie ,
      getMovies
  }