import React, { useEffect } from 'react'
import Button from "../../components/Button";
import MovieForm from './MoviesForm';
import moment from "moment";
import { message, Table } from "antd";
import { useDispatch } from 'react-redux';
import { GetAllMovies } from '../../api/movies';
import { HideLoading, ShowLoading } from '../../redux/loadersSlice';


function MovieList() {
    const [movies, setMovies] = React.useState([]);
    const [showMovieFormModal, setShowMovieFormModal] = React.useState(false);
    const [selectedMovie, setSelectedMovie] = React.useState(null);
    const [formType, setFormType] = React.useState("add");
    const dispatch = useDispatch();
    const getData = async () => {
        try {
            dispatch(ShowLoading());
            const response = await GetAllMovies();
            if (response.success) {
                setMovies(response.data);
            } else {
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };


    const columns = [
        {
            title: "Name",
            dataIndex: "title",
        },
        {
            title: "Description",
            dataIndex: "description",
        },
        {
            title: "Duration",
            dataIndex: "duration",
        },
        {
            title: "Genre",
            dataIndex: "genre",

        },
        {
            title: "Language",
            dataIndex: "language",
        },
        {
            title: "Release Date",
            dataIndex: "releaseDate",
            render: (text, record) => {
                return moment(record.releaseDate).format("DD-MM-YYYY");
            },
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (text, record) => {
                return <div className='flex gap-1'>
                    <i className="ri-pencil-line">
                        <i className="ri-delete-bin-line"
                            onClick={() => {
                                setSelectedMovie(record);
                                setFormType("edit");
                                setShowMovieFormModal(true);

                            }}
                        ></i>
                    </i>
                </div>
            }
        }
    ]

    useEffect(() => {
        getData();
    }, []);



    return (
        <div>
            <div className="flex justify-end">
                <Table columns={columns} dataSource={movies} />
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
                formType={formType}
                getData={getData}
            />
            }
        </div>
    )


}

export default MovieList