import clsx from "clsx"
import styles from './Header.module.css'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios"


const logo = '../../../image/logo/logo-nosloganblack.png'

function Header() {
    let navigate = useNavigate();
    const handleLogout = async () => {
        let userData = await JSON.parse(localStorage.getItem('user'));
        await axios({
            method: 'post',
            url: 'http://localhost:1337/logout',
            data: {
                idUser: userData.id,
            }
        })
            .then(async (res) => {
                // console.log(res.data, res.otp, res.res);
                if (res.data.status === 202) {
                    localStorage.clear();
                    navigate(`../login`);
                }
            })
            .catch(error => console.log(error));

    }
    return (
        <div className={clsx(styles.headerForm, 'row')}>
            <div className="col-xs-12  col-sm-5 col-md-7 col-lg-7">
                <Link to={'../'}>
                    <img src={logo} alt="" className={styles.logo} />
                </Link>
            </div >
            <div className={clsx(styles.formSearch, 'col-xs-12 col-md-3 col-lg-3 col-sm-5')}>
                <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-primary" type="button">Search</button>
                </form>
            </div>
            <div className={clsx(styles.formBtn, 'col-xs-12  col-md-2 col-lg-2 col-sm-2')}>
                <Link to={'/changepass'} className={styles.iconMenu}>
                    <img src="https://img.icons8.com/ios-filled/23/undefined/password1.png" alt='' />
                </Link>
                <div className={styles.iconMenu}>
                    <img src="https://img.icons8.com/windows/32/000000/user.png" alt="" />
                </div>
                <div onClick={handleLogout} className={styles.iconMenu}>
                    <img src="https://img.icons8.com/ios-glyphs/28/000000/logout-rounded--v1.png" alt="" />
                </div>
            </div>
        </div >
    )
}
export default Header
