import React, { useState, useRef, useEffect } from "react";
import "./CarouselMiddleLiveChannel.css";
import axios from "axios";
import _ from "lodash";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
const CarouselMiddleLiveChannel = () => {
  const [liveChannel, setLiveChannel] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const loadingRef = useRef();
  const showClick = (e) => {
    e.preventDefault();
    setShowMore(true);
  };
  const hideLoading = () => {
    setLoading(false);
  };

  // useEffect(() => {
  //   const handleLoading = () => {
  //     setLoading(false);
  //   };
  //   loadingRef.current.addEventListener("load", handleLoading);
  //   return () => {
  //     loadingRef.current.removeEventListener("load", handleLoading);
  //   };
  // }, []);

  useEffect(() => {
    const fecthLive = async () => {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/twitch/streams"
      );
      // console.log(data);
      let dataArray = data;
      dataArray.map((game) => {
        let newUrl = game.thumbnail_url
          .replace("{width}", "440")
          .replace("{height}", "248");
        game.thumbnail_url = newUrl;
      });
      // console.log(finalArray);
      setLiveChannel(data);
      // setLoading(false);
    };
    fecthLive();
  }, []);
  console.log(liveChannel);
  const checkTags = (streams, i) => {
    if (streams.localization_names.length !== 1) {
      let a = _.mapKeys(streams.localization_names, "en-us");
      let b = Object.keys(a);
      return (
        <>
          {b.map((e, i) => {
            return (
              <a
                className="channel__tag__anchor"
                key={i}
                style={{ marginLeft: 2, maxWidth: 70 }}
                href="#"
              >
                {e}
              </a>
            );
          })}
        </>
      );
    }
    return (
      <a className="channel__tag__anchor" style={{ marginLeft: 2 }} href="#">
        {streams.localization_names[0]["en-us"]}
      </a>
    );
  };

  return (
    <div className="card__maxWidth__margin app__tower__gutter">
      <h3>Live Channels we think you'll like</h3>

      <div className="videos">
        <div className="card__display__flex__wrap">
          {liveChannel.map((e, i) => {
            return (
              <>
                <div className="app__tower__300 app__tower__padding__gutter">
                  <div className="app__card__height">
                    <div className="app__card__padding_bottom">
                      <article className="card__display__flex__direction">
                        <div className="app__width app__order__2 app__margin__top">
                          <div className="app__flex__nowrap app__flex">
                            <div className="app__min__width__0 app__order__2 app__flex__shrink__1 app__flex__grow__1 app__width">
                              <div className="app__margin__bottom">
                                <div className="channel__font_1">
                                  <h3 className="app__ellipsis app__font__weight">
                                    {e.title}
                                  </h3>
                                </div>
                              </div>
                              <div className="channel__user">
                                <div>
                                  <h4 className="channel__user__name">
                                    {e.user_name}
                                  </h4>
                                </div>
                                <div>
                                  <h5 className="channel__game__name" href="#">
                                    {e.game_name}
                                  </h5>
                                </div>
                              </div>
                              <div className="channel__tag">
                                <div className="channel__tag__1">
                                  <div className="channel__tag__2">
                                    <div className="channel__tag__3">
                                      {checkTags(e)}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="channel__icon">
                              <img
                                className="channel__icon__1"
                                src={e.profile_image_url}
                              />
                            </div>
                            <div className="channel__down">
                              <MoreVertIcon />
                            </div>
                          </div>
                        </div>

                        <div className="app__order__1">
                          <img
                            className="channel__thumbnail"
                            src={e.thumbnail_url}
                          />
                        </div>
                      </article>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
      <h2 className="custom">
        <span className="showMore">
          <a className="showMore__button" href="#">
            Show more
            <ExpandMoreOutlinedIcon className="down__icon" />
          </a>
        </span>
      </h2>

      <div className="other">
        <div className="other__">
          <div className="other___">a</div>
        </div>
      </div>
    </div>
  );
};

export default CarouselMiddleLiveChannel;
