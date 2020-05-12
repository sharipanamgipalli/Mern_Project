import React, { Component } from "react";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import { fetchItineraries } from "../store/actions/itineraryActions";
import { fetchFavouriteItinerary } from "../store/actions/itineraryActions";
import { deleteFavouriteItinerary } from "../store/actions/itineraryActions";
import { postUserComment } from "../store/actions/itineraryActions";
import { deleteUserComment } from "../store/actions/itineraryActions";

class Itineraries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itineraries: [],
      favourites: [],
      comment: "",
    };
  }
  componentDidMount() {
    //In the props we have access to both redux store and redux actions (only the ones remaped in mapStateToProps and mapDispatchToProps)
    const cityName = this.props.match.params.cityName;
    this.props.fetchItineraries(cityName);
  }
  handleFavourite = (id, title) => {
    const emailofUser = this.props.myLoginDetails.loggedInUser.email;
    this.props.fetchFavouriteItinerary(id, emailofUser, title);
  };
  deleteFavourite = (id, title) => {
    const emailofUser = this.props.myLoginDetails.loggedInUser.email;
    this.props.deleteFavouriteItinerary(id, emailofUser, title);
  };
  handleComment = (event) => {
    this.setState({ comment: event.target.value });
  };
  //to take the id as parameter first and then take the event parameter
  handlePostComment = (id) => (e) => {
    e.preventDefault();
    const email = this.props.myLoginDetails.loggedInUser.email;
    const comment = this.state.comment;
    this.props.postUserComment(id, comment, email);
  };
  handleDeleteComment = (id, email, comment) => (e) => {
    e.preventDefault();
    this.props.deleteUserComment(id, comment, email);
  };

  render() {
    const email = this.props.myLoginDetails.loggedInUser.email;

    return (
      <div className="itinerary-container">
        <div className="row d-flex">
          <div className="p-2 col-12">
            {this.props.myItineraries.itineraries.map((itinerary) => {
              return (
                <div className="itinerary-img">
                  <img src={itinerary.img} alt=" City itinerary image" />
                  <div classname="favourite-btn">
                    <i
                      className="fa fa-heart fa-2x"
                      style={
                        itinerary.favourites.includes(email)
                          ? { color: "red" }
                          : { color: "white" }
                      }
                      onClick={() => {
                        itinerary.favourites.includes(email)
                          ? this.deleteFavourite(itinerary._id, itinerary.title)
                          : this.handleFavourite(
                              itinerary._id,
                              itinerary.title
                            );
                      }}
                    />
                  </div>

                  <div className="comment-box">
                    <p>COMMENTS</p>
                    {itinerary.comments.map((comment) => {
                      return (
                        <div className="card">
                          <div className="card-body">
                            <div className="card-title">
                              <img
                                src={
                                  this.props.myLoginDetails.loggedInUser.picture
                                }
                                style={{ width: "40px", height: "40px" }}
                                alt=""
                              />
                              <p>{comment.email}</p>
                              <p className="date-time">
                                (Posted on:
                                <time dateTime="2020-04-28T20:00">
                                  April 28, 2020 at 20:00 PM)
                                </time>{" "}
                              </p>
                            </div>
                            <div className="comment-text card-text">
                              <p>{comment.comment}</p>

                              <i
                                className="fa fa-times fa-2x icon"
                                aria-hidden="true"
                                onClick={this.handleDeleteComment(
                                  itinerary._id,
                                  comment.email,
                                  comment.comment
                                )}
                              />

                              <i
                                className="fa fa-pencil-square-o fa-2x"
                                aria-hidden="true"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    <form className="form-inline my-2 my-lg-0">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Add your comment"
                        id="comment"
                        name="comment"
                        onChange={this.handleComment}
                        required
                      />

                      <button
                        className="btn btn-success my-2 my-sm-0 button"
                        type="submit"
                        onClick={this.handlePostComment(itinerary._id)}
                      >
                        Post
                      </button>
                    </form>
                  </div>

                  <div className="itinerary-details">
                    <p>{itinerary.title}</p>
                    <p>CITY:{itinerary.city}</p>
                    <p>WHAT YOU DO:{itinerary.summary}</p>
                    <p>DURATION:{itinerary.duration}</p>
                    <p>PRICE:{itinerary.price}</p>
                    <p>RATING:{itinerary.rating}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    myItineraries: state.myItineraries,
    myLoginDetails: state.myLoginDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchItineraries: (cityName) => {
      dispatch(fetchItineraries(cityName));
    },
    fetchFavouriteItinerary: (id, emailofUser, title) => {
      dispatch(fetchFavouriteItinerary(id, emailofUser, title));
    },
    deleteFavouriteItinerary: (id, emailofUser, title) => {
      dispatch(deleteFavouriteItinerary(id, emailofUser, title));
    },
    postUserComment: (id, comment, email) => {
      console.log("comment", comment);
      dispatch(postUserComment(id, comment, email));
    },
    deleteUserComment: (id, comment, email) => {
      console.log(comment);
      dispatch(deleteUserComment(id, comment, email));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Itineraries);
