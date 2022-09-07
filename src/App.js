import React, { useState, useEffect, useLayoutEffect } from "react";
import "./App.css";
import PageHeader from "./Components/PageHeader";
import Editor from "./Components/Editor";
import Header from "./Components/Navbar/Header";
import Sidebar from './Components/Sidebar/Sidebar';
import Split from 'split.js'
import Calendar from './Components/Editor/Calendar';
import axios from "axios";




function App() {
	const [isSide, setIsSide] = useState(true);
	const toggleSide = () => setIsSide((prevSide) => !prevSide);
  useLayoutEffect(()=>{
    if(isSide){
      Split(["#split-0", "#split-1"], {
        sizes: [20, 80],
        maxSize: [500, Infinity],
        minSize: [200, 200],
        gutterSize: 2,
        dragInterval: 2,
        gutterAlign: 'start'
      })
    }
  },[isSide])

  const [isFavorite,setIsFavorite] = useState(false)
  const toggleFavorite = () => (setIsFavorite(prevIsFavorite => !prevIsFavorite))
  
  const [titleGroup,setTitleGroup] = useState({ icon :null,title : "Untitled"})
  const onEmojiClick = (event,emojiObject) =>{
    const {id,value,className}=event.target
    if(className === "emoji-img"){
      setTitleGroup(prevTitleGroup => {
        return{
          ...prevTitleGroup,
          icon: emojiObject.emoji
        }
      })
    }
    if(id === "pageTitle"){
      setTitleGroup(prevTitleGroup => {
        return{
          ...prevTitleGroup,
          title: value
        }
      })
    }
    axios({
      method: "put",
      baseURL: "http://localhost:3001",
      url: "/api/v1/pages/"+currentPageID,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("zettelk_user_token"),
      },
    })
  }

  // setpage
  const [page, setPage] = useState([]);
	useEffect(() => {
		axios({
			method: "get",
			baseURL: "http://localhost:3001",
			url: "/api/v1/users/" + localStorage.getItem("zettelk_user_id"),
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("zettelk_user_token"),
			},
		})
			.then((result) => {
				return JSON.stringify(result.data.pages);
			})
			.then((datas) => {
				let data = JSON.parse(datas);
				return data;
			})
			.then((data) => {
				setPage(data);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);
  const addPage1 = () => {
		axios({
			method: "post",
			baseURL: "http://localhost:3001",
			url: "/api/v1/pages",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("zettelk_user_token"),
			},
		})
			.then((result) => {
				let datas = JSON.stringify(result.data.pages);
				let jsonData = JSON.parse(datas);
				setPage(jsonData);
			})
			.catch((err) => {
				console.error(err);
			});
	};

  // click and set page_id
  const [currentPageID, setcurrentPageID] = useState("")

  const handlePageID = (pageID)=>{
    setcurrentPageID(pageID)
    localStorage.setItem("current_zettelk_page_id",pageID)
    axios({
      method: "get",
      baseURL: "http://localhost:3001",
      url: "/api/v1/pages/" + pageID + ".json",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("zettelk_user_token"),
      },
      params:{
        id: pageID
      }
    })
  }
  
  return (
    <div>
      <div class="split" className="h-screen w-full flex" >
        {isSide && <div id="split-0" className="relative side-minW flex-grow-0">
              <Sidebar isFavorite={isFavorite} toggleFavorite={toggleFavorite} toggle={toggleSide} titleGroup={titleGroup}  onEmojiClick={onEmojiClick} page={page} addPage1={addPage1} handlePageID={handlePageID} currentPageID={currentPageID} />
        </div>}

        <div id="split-1" className="flex-grow w-full overflow-hidden">
          <Header isFavorite={isFavorite} toggleFavorite={toggleFavorite} isSide={isSide} toggleSide={toggleSide}  titleGroup={titleGroup} onEmojiClick={onEmojiClick}/>  
            < PageHeader />
            < Editor currentPageID={currentPageID} />
            {/* <Calendar /> */}
          
        </div>
      </div>  
    </div>
    
  )
}
export default App;