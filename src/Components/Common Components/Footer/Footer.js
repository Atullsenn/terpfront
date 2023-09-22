import React, { useEffect, useState } from 'react'
import Images from "../../../Images/Image";
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIcon from '@mui/icons-material/Phone';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import axios from 'axios';
import { baseUrl } from '../../../Url/url';
import moment from 'moment';
import CopyrightIcon from '@mui/icons-material/Copyright';
import {toast} from 'react-toastify'
import { landingPageData } from '../../../data';

const Footer = () => {
    const [popularCategoryList, setPopularCategoryList] = useState([])
    const [contactInfo, setContactInfo] = useState([])
    const [email, setEmail] = useState('')
    const newYear = moment().format('YYYY')

    const ScrollTop = () => {
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }

    const getCategoryList = () => {
        axios.get(`${baseUrl}/popular-category`, {
        }).then((response) => {
            if (response.data.success) {
                // setPopularCategoryList(response.data.Data.filter(item => item.type === 'P'));
                setPopularCategoryList(response.data.Data)
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getCategoryList()
    }, [])




    const getContactInformation = () => {
        axios.get(`${baseUrl}/get-contacts`, {
        }).then((response) => {
            if (response.data.success) {
                setContactInfo(response.data.Data)
                // setState((prevState) => ({ ...prevState, contactInfo: response.data.Data }))
            }
        }).catch((error) => {
            console.log(error)
        })
    }


    useEffect(() => {
        getContactInformation()
    }, [])

    
   
    // Subscribe news letter api
    const subscribeNewsLetter = (e)=>{
        e.preventDefault()
        let request = {
            email: email
        }

        if(email == ""){
            toast.error('Please Enter email',{
                autoClose:1000,
                theme: 'colored'
            })
        }

        else{
        
        axios.post(`${baseUrl}/subscribe-newsletter`,request).then((response)=>{
            if(response.data.message === 'Email already exist !!'){
                toast.success('Thankyou for subscribe',{
                    autoClose: 1000,
                    theme: 'colored'
                })
            }
            if(response.data.error){
                toast.error(response.data.error.email[0],{
                    autoClose: 1000,
                    theme: 'colored'
                })
            }
            if(response.data.success === true){
                toast.success('Thankyou for subscribe',{
                    autoClose: 1000,
                    theme: 'colored'
                })
            }
        }).catch((error)=>{
            console.log(error)
        })
    }
    
    }


    return (
        <footer className="site-footer footer-light">
            {/* <div className="footer-top-newsletter">
                <div className="container">
                    <div className="sf-news-letter">
                        <span>{landingPageData.footerTitleOne}</span>
                        <form>
                            <div className="form-group sf-news-l-form">
                                <input onChange={(event)=>{setEmail(event.target.value)}} type="text" className="form-control" placeholder="Enter Your Email" />
                                <button onClick={subscribeNewsLetter} type="submit" className="sf-sb-btn">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div> */}
            <div className="footer-top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-6  m-b30 d-flex justify-content-center">
                            <div className="sf-site-link sf-widget-link">
                                <h4 className="sf-f-title">{landingPageData.footerTitleTwo}</h4>
                                <ul>
                                    <li onClick={() => { ScrollTop() }}><NavLink to="/"><KeyboardDoubleArrowRightIcon /> {landingPageData.footerTitleThree}</NavLink></li>
                                    <li><NavLink to="/contact-us"><KeyboardDoubleArrowRightIcon /> {landingPageData.footerTitleFour}</NavLink></li>
                                    <li><NavLink to="/how-it-works"><KeyboardDoubleArrowRightIcon /> {landingPageData.footerTitleFive}</NavLink></li>
                                    <li><NavLink to="/news"><KeyboardDoubleArrowRightIcon /> {landingPageData.footerTitleSix}</NavLink></li>
                                    <li><NavLink to="/privacy-policy"><KeyboardDoubleArrowRightIcon /> {landingPageData.footerTitleSeven}</NavLink></li>
                                    <li><NavLink to="/terms-conditions"><KeyboardDoubleArrowRightIcon /> {landingPageData.footerTitleEight}</NavLink></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6  m-b30 d-flex justify-content-center">
                            <div className="sf-site-link sf-widget-cities">
                                <h4 className="sf-f-title">{landingPageData.footerTitleNine}</h4>
                                <ul>
                                    {popularCategoryList.length
                                        ? popularCategoryList.map((item) => {
                                            return <li><NavLink to={`/category/${item.id}`}><KeyboardDoubleArrowRightIcon /> {item.name} </NavLink></li>
                                        })
                                        : <li> <KeyboardDoubleArrowRightIcon /> {landingPageData.footerTitleTen} </li>
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6  m-b30 d-flex justify-content-center">
                     
                            <div className="sf-site-link sf-widget-contact">
                                <h4 className="sf-f-title">{landingPageData.footerTitleEleven}</h4>
                                {contactInfo.map((item,index)=>{return(

                               
                                <ul>
                                    {item.type == 2?
                                    <li><HomeIcon />{item.title} </li>:""
                                }
                                {item.type == 1 ? 
                                    <li><PhoneIcon />{item.title}</li>:""
                                }
                                   {item.type == 3 ? 
                                    <li><AttachEmailIcon />{item.title}</li>:""
                                   }
                                </ul>
                             )})}
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <div className="sf-footer-bottom-section">
                        <div style={{color:'blue'}} className="sf-f-logo"><a href="javascript:void(0);"><img src={Images.Logo} alt="" />  Terp</a>
                        </div>
                        <div className="sf-f-copyright">
                            <span>Copyright 2022 - {newYear} <CopyrightIcon/> | Terp. All Rights Reserved</span>
                        </div>
                        <div className="sf-f-social">
                            <ul className="socila-box">
                                {contactInfo && contactInfo[5]?.type === 4 ? 
                                <li><a target="_blank" rel="noreferrer" href={`${contactInfo[5].title}`}><i> <TwitterIcon /> </i></a></li>:""
                                }   
                                 {contactInfo && contactInfo[6]?.type === 5 ?  
                                <li><a target="_blank" rel="noreferrer" href={`${contactInfo[6].title}`}><i> <FacebookIcon /></i></a></li> :""
                                 }

                                {contactInfo && contactInfo[4]?.type === 3 ?  
                                <li><a target="_blank" rel="noreferrer" href={`mailto:${contactInfo[4].title}`}><i> <EmailIcon /></i></a></li>:""
                                }
                                {contactInfo && contactInfo[7]?.type === 6 ?  
                                <li><a target="_blank" rel="noreferrer" href={`${contactInfo[7].title}`}><i> <InstagramIcon /></i></a></li> :""
}
                            </ul>
                            
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;