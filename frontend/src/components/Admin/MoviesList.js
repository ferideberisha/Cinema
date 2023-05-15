import React from 'react'
import Button from "../../components/Button";
import MovieForm from './MoviesForm';
function MovieList() {
    const [movies, setMovies] = React.useState([]);
    const [showMovieFormModal, setShowMovieFormModal] = React.useState(false);
    const [selectedMovie, setSelectedMovie] = React.useState(null);
    const [formType, setFormType] = React.useState("add");
    return (
        <div>
            <div className="flex justify-end">
                <Button title="Add Movie" variant="outlined"
                    onClick={() => {
                        setShowMovieFormModal(true);
                        setFormType("add");

                    }}
                />
            </div>
            {showMovieFormModal && <MovieForm
                showMovieFormModal={showMovieFormModal}
                setShowMovieFormModal={setShowMovieFormModal}
                selectedMovie={setSelectedMovie}
                formType={formType} />
            }
        </div>
    )


}

export default MovieList