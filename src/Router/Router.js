import Error from '../Components/Error/Error'
import ABC from '../Pages/ABC/ABC'
import Home from '../Pages/Home/Home'
import Messenges from '../Pages/Messenges/Messenges'
import Profile from '../Pages/Profile/Profile'
import Recs from '../Pages/Recs/Recs'
import CreateProfile from '../Pages/CreateProfile/CreateProfile'
import CreateProfiles from '../Pages/CreateProfile/CreateProfiles'
import CreateProfile3 from '../Pages/CreateProfile/CreateProfile3'
import Loaded from '../Pages/Loaded/Loaded'
import Notificatio from '../Pages/Notification/Notification'
import FormEdit from '../Components/View/Edit/FormEdit'
import FormEditheight from '../Components/View/Edit/FormEditheight'
import Edit from '../Pages/Edit/Edit'
import FormEditGender from '../Components/View/Edit/FormEditGender'
import FormEditrelationship from '../Components/View/Edit/FormEditEditrelationship'
import FormEditPasions from '../Components/View/Edit/FormEditPassions'
import FormEditAboutMe from '../Components/View/Edit/FormEditAbout_me'
import ThankYou from '../Components/Thank/ThankYou'
import SettingEdit from '../Pages/SettingEdit/SettingEdit'
import SettingEdit2 from '../Pages/SettingEdit/SettingEdit2'
import SettingEdit3 from '../Pages/SettingEdit/SettingEdit3'
import SettingEdit4 from '../Pages/SettingEdit/SettingEdit4'
import Search from '../Pages/Recs/Search'
import SecurityPage from '../Utils/SecurityPage'
import HeartLoading from '../Utils/heart'
export const routes = [
    {
        path: '/',
        page: Home,
        //isShowHeader: true
    },{
        path:'/ThankYou',
        page: ThankYou
    },{
        path:"/Notification",
        page:Notificatio
    },{
        path:"/Notification/:id",
        page:Notificatio
    },{
        path:'/Loaded',
        page:Loaded
    },{
        path: '/CreateProfile3',
        page: CreateProfile3,
    },{
        path: '/CreateProfiles',
        page: CreateProfiles,
    },{
        path: '/CreateProfile',
        page: CreateProfile,
    },{
        path: '/Mess/:id',
        page: Messenges,
       //isShowHeader: true
    },{
        path: '/Profile',
        page: Profile,
       //isShowHeader: true
    },{
        path: '/Profile/Edit',
        page: Edit,
    },{
        path: '/Profile/Edit/Editinterests',
        page: FormEdit,
       //isShowHeader: true
    },{
        path: '/Profile/Edit/Editrelationship',
        page: FormEditrelationship,
    },{
        path: '/Profile/Edit/EditPasions',
        page: FormEditPasions,
    },{
        path: '/Profile/Edit/EditGender',
        page: FormEditGender,
    },{
        path: '/Profile/Edit/EditHeight',
        page: FormEditheight,
    },{
        path: '/Profile/Edit/EditAboutMe',
        page: FormEditAboutMe,
    },{
        path: '/Recs',
        page: Recs,
       //isShowHeader: true
    },{
        path: '/ABC',
        page: ABC,
       //isShowHeader: true
    },{
        path: '/Settings',
        page: SettingEdit,
    },{
        path: '/Settings1',
        page: SettingEdit2,
    },{
        path: '/Settings2',
        page: SettingEdit3,
    },{
        path: '/Settings3',
        page: SettingEdit4,
    },{
        path: '/Settings4',
        page: SettingEdit,
    },{
        path: '/Search',
        page: Search,
    },{
        path: '/Security',
        page: SecurityPage, 
    },{
        path: '/Heart',
        page: HeartLoading, 
    },{
        path: '*',
        page: Error
    }]
