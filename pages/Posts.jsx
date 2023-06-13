import React, {useEffect, useMemo,useRef, useState} from 'react';
import PostList from './../components/PostList';
import PostForm from './../components/PostForm';
import './../styles/App.css'
import PostFilter from './../components/PostFilter';
import MyModal from './../components/UI/MyModal/MyModal';
import MyButton from './../components/UI/button/MyButton';
import {usePosts} from "./../hooks/usePosts"
import PostService from './../API/PostService';
import Loader from './../components/UI/Loader/Loader'
import { useFetching } from './../hooks/useFetching';
import { getPageCount, getPagesArray } from './../utils/pages';
import Pagination from './../components/UI/pagination/Pagination';

function Posts(){
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query:''})
    const [modal, setModal] = useState(false);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    
    let pagesArray = getPagesArray(totalPages)
  
  
    const [fetchPosts, isPostsLoading, postError] = useFetching(async() => {
      const response = await PostService.getAll(limit, page)
      setPosts(response.data)
      const totalCount = response.headers['x-total-count']
      setTotalPages(getPageCount(totalCount, limit))
    })
  
    const sortedPosts = useMemo(() => {
      if(filter.sort) {
        return [...posts].sort((a,b) => a[filter.sort].localeCompare(b[filter.sort]))
      }
      return posts
    }, [filter.sort, posts])
  
  
    const changePage = (page) => {
      setPage(page)
    }
    
  
    useEffect(() => {
      fetchPosts(limit,page)
    }, [])
  
    const createPost = (newPost) => {
      setPosts([...posts, newPost])
      setModal(false)
    }  
  
    
  
    const removePost = (post) => {
      setPosts(posts.filter(p => p.id !== post.id))
    }  
  
    
  
    return (
      <div className="App">
        <button onClick={fetchPosts}>GET POSTS</button>
        <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
          Создать пользователя
        </MyButton>
        <MyModal visible={modal} setVisible={setModal}>
            <PostForm create={createPost}/>
        </MyModal>
        <PostForm create={createPost}/>
        <hr style={{margin: '15px 0'}}/>
        <PostFilter
          filter={filter}
          setFilter={setFilter}
        /> 
        {postError &&
          <h1>Произошла ошибка ${postError}</h1>
        }
        {isPostsLoading
          ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
          : <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты про Js"/>
        }
        <Pagination
          page={page}
          changePage={changePage}
          totalPages={totalPages}
        />  
    </div>
    );
}

export default Posts;