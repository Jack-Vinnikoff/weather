import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps, RouteProps, Link } from 'react-router-dom'
import { Fade } from 'react-reveal'
import { checkHasIcons } from '../../common/index.js'
import { SMALL_SIZE, MEDIUM_SIZE } from '../../constants/index.js'
import { getListCityies } from '../../store/modules/city/selector.js'
import { removeCity, removeAllCityies, setCurrentCity } from '../../store/modules/city/index.js'
import Modal from '../../components/Modal/Modal.js';
import AddCityModal from './AddCityModal/AddCityModal.jsx'
import './Cityies.scss'

class ListCityies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModalAddCity: false
        };
    }

    openModalAddCity = () => {
        this.setState({ showModalAddCity: true });
    }

    closeModal = () => {
        this.setState({ showModalAddCity: false });
    }

    removeCity = (id) => {
        const newListCityies = this.props.listCityies.filter((item) => item.id !== id)
        this.props.removeCity(newListCityies)
    }

    renderItemCity = (item) => {
        return (
            <React.Fragment>
                <div className="item_city">
                    <div className="icon">
                        <img src={checkHasIcons('smallIcons', item.weather[0].icon)} />
                    </div>
                    <div className="info_panel">
                        <span className="title_city">{item.name}</span>
                        <span className="descr_weather">{item.weather[0].description}</span>
                        <div className="temp">
                            {item.main.temp} ℃
                        </div>
                    </div>
                 </div>
                <div className="more_info">
                    <span>temperature from {item.main.temp_max} to {item.main.temp_min} °С, wind {item.wind.speed} m/s. clouds {item.clouds.all}%</span>
                </div>
            </React.Fragment>
        )
    }
    renderListCityies = () => {
        const { listCityies } = this.props
        return (
            <div className="wrapper">
                <div className="wr_content_cityies">
                    <div className="btn_for_content">
                        <button className="btn">Update Data</button>
                        <button className="btn" onClick={this.props.removeAllCityies}>Clear all</button>
                    </div>
                    <div className="content_cityies bg">
                        {listCityies.map((item, index) => (
                            <div className="wr_item_city" key={index}>
                                <Link 
                                    to={{
                                        pathname: `/forecast`
                                        }}
                                    onClick={(e) => this.props.setCurrentCity(item)}
                                >
                                    {this.renderItemCity(item)}
                                </Link>
                                <div>
                                    <button onClick={(e) => this.removeCity(item.id)} className="btn">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const { showModalAddCity } = this.state
        return (
            <div className="wrapper_list_cityies">
                <Fade left>
                    <div className="wr_btn_add">
                        <div className="btn_add" onClick={this.openModalAddCity}>Add City</div>
                    </div>
                </Fade>
                <Modal 
                    isOpen={showModalAddCity}
                    title="Add City"
                    closeModal={this.closeModal}
                    sizeModal={MEDIUM_SIZE}
                >
                    <AddCityModal 
                        closeModal={this.closeModal}
                    />
                </Modal>
                {this.props.listCityies.length && this.renderListCityies() || null }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    listCityies: getListCityies(state)
})

const mapDispatchToProps = (dispatch) => ({
    removeCity(data) {
        dispatch(removeCity(data))
    },
    removeAllCityies() {
        dispatch(removeAllCityies())
    },
    setCurrentCity(data) {
        dispatch(setCurrentCity(data))
    }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListCityies))
