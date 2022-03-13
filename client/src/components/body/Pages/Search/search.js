import { Button, TextField } from "@material-ui/core";
import "./search.css";
import SearchIcon from "@material-ui/icons/Search";
import { useEffect, useState } from "react";
import axios from "axios";
import SingleContent from "../../movies/SingleContent/SingleContent";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../Loader/Loader";

const unavailable = "https://www.movienewz.com/img/films/poster-holder.jpg";

const Search = () => {
	const [searchText, setSearchText] = useState("");
	//const [dropdownlist, setDropdownlist] = useState([]);

	const [content, setContent] = useState([]);
	const [loading, setLoading] = useState(false);
	//const [flag, setFlag] = useState(false);
	// const compo =()=>{
	//   {
	//     return (
	//       <div>
	//       {dropdownlist}
	//       </div>

	//     );
	//   }
	//   };

	// const darkTheme = createMuiTheme({
	//   palette: {
	//     type: "dark",
	//     primary: {
	//       main: "#fff",
	//     },
	//   },
	// });

	const notify = (msg) => {
		toast(msg);
	};

	var poster = [];

	const fetchPoster = (movie_id) => {
		return axios.get(
			`https://api.themoviedb.org/3/movie/${movie_id}?api_key=03e0bf2107b04c431fb59f7dafb7905b`
		);
	};

	const searchdropdown = async (searchText1) => {
		// try {
		//   setDropdownlist([]);
		//   console.log("1" + searchText1);
		//   if (searchText1.length > 0) {
		//     console.log("inside dbc "+dropdownlist);
		//     const res = await axios.get(`/movie/get_search_title/${searchText1}`);
		//     const { movies } = res.data;
		//     console.log("222" + movies.length);
		//     if (!movies) {
		//       console.log("no movies");
		//       setDropdownlist([]);
		//       return;
		//     }
		//     let array = [];
		//     movies.forEach(movie => {
		//       const { movie_id, title } = movie;
		//       const newdata = {
		//         movie_id,
		//         title
		//       };
		//       array.push(newdata);
		//     //  setDropdownlist([...dropdownlist,newdata]);
		//       // console.log("inside foreach "+newdata.movie_id+" "+newdata.title);
		//     }
		//     )
		//    setDropdownlist(array);
		//    setFlag(false);
		//     // fetchSearch();
		//     // var delayInMilliseconds = 1000; //1 second
		//     // setTimeout(function () {
		//     //   //your code to be executed after 1 second
		//     //   console.log(dropdownlist);
		//     // }, delayInMilliseconds);
		//   }
		//   else {
		//     setDropdownlist('');
		//   }
		// }
		// catch (err) {
		//   console.log(err);
		// }
	};

	const fetchSearch = async () => {
		// try {
		//   console.log("inside fetchSearch"+searchText);
		//   console.log("inside fetchSearchdrop"+dropdownlist);
		// }
		// catch (err) {
		//   console.log(err);
		// }
		try {
			setContent([]);
			var cnt = 0;
			setLoading(true);
			const res = await axios.get(`/movie/get_search_movie/${searchText}`);
			// console.log(res.data);
			const { movies } = res.data;
			if (!movies) {
				// console.log("no movies");
				setContent("");
				setLoading(false);
				return;
			}
			// console.log(movies);

			const posterdata = await Promise.all(
				movies.map((movie) => fetchPoster(movie.movie_id))
			);

			posterdata.forEach((movie) => {
				if (movie.data.poster_path != null)
					poster.push(
						`https://image.tmdb.org/t/p/w300${movie.data.poster_path}`
					);
				else poster.push(unavailable);
			});
			setContent([]);
			movies.forEach((movie) => {
				const {
					movie_id,
					title,
					overview,
					release_date,
					runtime,
					vote_average,
				} = movie;
				const poster_path = poster[cnt];
				cnt++;
				const newdata = {
					movie_id,
					title,
					overview,
					release_date,
					runtime,
					poster_path,
					vote_average,
				};
				// console.log(newdata);
				setContent((content) => [...content, newdata]);
			});

			setLoading(false);
			console.log("heloooooo");

			// console.log(content);
		} catch (error) {
			// console.error(error);
		}
	};

	useEffect(() => {
		window.scroll(0, 0);
		//setContent([]);
		//searchdropdown(searchText);
		//  fetchSearch();
		// eslint-disable-next-line
	}, []);

	return (
		<div className="search-page">
			<center>
				<div className="search">
					<TextField
						style={{ flex: 1 }}
						className="searchBox"
						label="Search movie"
						variant="filled"
						onChange={(e) => {
							setSearchText(e.target.value);
							// setFlag(true);
							//searchdropdown(e.target.value);
						}}
					/>
					<Button
						className="searchButton"
						onClick={fetchSearch}
						variant="contained"
						style={{ marginLeft: 5 }}
					>
						<SearchIcon fontSize="large" />
					</Button>
				</div>
			</center>

			<ToastContainer />

			{loading && <Loader />}
			<div className="all-movies">
				{content &&
					content.map((c) => (
						<SingleContent
							key={c.movie_id}
							id={c.movie_id}
							poster={c.poster_path}
							title={c.title}
							date={c.release_date}
							vote_average={c.vote_average}
							notify={notify}
						/>
					))}
				{searchText && !content && <h2>No Movies Found</h2>}
			</div>
		</div>
	);
};

export default Search;
