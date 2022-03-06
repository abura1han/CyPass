import "../../styles/BusinessProfile.css";
import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import appConfig from "../../config";
import BusinessContext from "../../contexts/BusinessContext";
import NotificationContext from "../../contexts/NotificationContext";

function BusinessProfile() {
  const { business, setBusiness } = useContext(BusinessContext);
  const { setNotification } = useContext(NotificationContext);
  const [addPhoto, setAddPhoto] = useState([false, false]);

  const [name, setName] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");
  const [logo, setLogo] = useState("");
  const [description, setDescription] = useState("");
  const [embedVideo, setEmbedVideo] = useState("");
  const [closeDate, setCloseDate] = useState("");
  const [phone, setPhone] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [yelp, setYelp] = useState("");
  const [howtoGetThere, setHowtoGetThere] = useState("");
  const [howtoPrepare, setHowtoPrepare] = useState("");
  const [attributes, setAttributes] = useState([]);
  const [amenities, setAmenities] = useState([]);

  // Toggle attributes
  const toggleAttributes = (value) => {
    if (!attributes.includes(value)) {
      setAttributes([...attributes, value]);
    } else {
      const list = attributes.filter((e) => e !== value);
      setAttributes(list);
    }
  };

  // Toggle amenities
  const toggleAmenities = (value) => {
    if (!amenities.includes(value)) {
      setAmenities([...amenities, value]);
    } else {
      const list = amenities.filter((e) => e !== value);
      setAmenities(list);
    }
  };

  // Get business profile info
  useEffect(() => {
    fetch(`${appConfig.serverUrl}api/business_profile/my_info`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("access_token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          setNotification({
            type: "error",
            msg: data.error,
          });
        }
        setBusiness(data.data);

        setName(data.data ? data.data.Name : "");
        setCoverPhoto(data.data.Cover_photo);
        setLogo(data.data.Logo);
        setDescription(data.data ? data.data.Description : "");
        setPhone(data.data ? data.data.Phone : "");
        setEmbedVideo(data.data ? data.data.Embed_video : "");
        setCloseDate(data.data ? data.data.Closed_dates : "");
        setFacebook(data.data ? data.data.Facebook : "");
        setInstagram(data.data ? data.data.Instagram : "");
        setTwitter(data.data ? data.data.Twitter : "");
        setYelp(data.data ? data.data.Yelp : "");
        setHowtoGetThere(data.data ? data.data.Howto_get_there : "");
        setHowtoPrepare(data.data ? data.data.Howto_prepare : "");
        setAttributes(data.data ? String(data.data.Attributes).split(",") : "");
        setAmenities(data.data ? String(data.data.Amenities).split(",") : "");
      });
  }, [setBusiness, setNotification]);

  // Create profile handler
  function createProfile() {
    fetch(`${appConfig.serverUrl}api/business_profile/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("access_token")}`,
      },
      body: JSON.stringify({
        Name: name ? name : null,
        Cover_photo: coverPhoto ? coverPhoto : null,
        Logo: logo ? logo : null,
        Embed_video: embedVideo ? embedVideo : null,
        Description: description ? description : null,
        Attributes: attributes ? attributes.toString() : null,
        Amenities: amenities ? amenities.toString() : null,
        Howto_get_there: howtoGetThere ? howtoGetThere : null,
        Howto_prepare: howtoPrepare ? howtoPrepare : null,
        Phone: phone ? phone : null,
        Facebook: facebook ? facebook : null,
        Instagram: instagram ? instagram : null,
        Twitter: twitter ? twitter : null,
        Yelp: yelp ? yelp : null,
        Closed_dates: closeDate ? closeDate : null,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setBusiness(data.data);
        setNotification({
          type: "success",
          msg: "Business profile creation successfull",
        });
        console.log(phone);
        console.log(facebook);
        setTimeout(() => window.location.reload(), 2000);
      });
  }

  // Update profile handler
  function updateProfile() {
    fetch(`${appConfig.serverUrl}api/business_profile/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("access_token")}`,
      },
      body: JSON.stringify({
        Name: name ? name : business.Name,
        Cover_photo: coverPhoto ? coverPhoto : business.Cover_photo,
        Logo: logo ? logo : business.Logo,
        Description: description ? description : business.Description,
        Phone: phone ? phone : business.Phone,
        Facebook: facebook ? facebook : business.Facebook,
        Instagram: instagram ? instagram : business.Instagram,
        Twitter: twitter ? twitter : business.Twitter,
        Yelp: yelp ? yelp : business.Yelp,
        Howto_get_there: howtoGetThere
          ? howtoGetThere
          : business.Howto_get_there,
        Howto_prepare: howtoPrepare ? howtoPrepare : business.Howto_prepare,
        Attributes: attributes ? attributes.toString() : business.Attributes,
        Amenities: amenities ? amenities.toString() : business.Amenities,
        Closed_dates: closeDate ? closeDate : business.Closed_dates,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setNotification({
          type: "success",
          msg: data.message,
        });
      });
  }

  return (
    <div className="business-profile-page">
      <div className="section">
        <h3>Showcase your venue</h3>
        <p>
          Businesses with great photos tend to get more reservations on
          ClassPass We recommend adding at least 3 or more authentic photos for
          your business.
        </p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!business) {
            createProfile();
          } else {
            updateProfile();
          }
        }}
      >
        <div className="section">
          <h4>
            Add your company name <span className="marked">Required</span>
          </h4>
          <div className="info">This name will set as your page name</div>
          <div className="input-box">
            <label htmlFor="bus-name">Name</label>
            <input
              type="text"
              id="bus-name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
        </div>

        <div className="section">
          <h4>Business close date</h4>
          <div>
            <input
              style={{ padding: "8px 10px", border: "1px solid lightgray" }}
              type="date"
              onChange={(e) => setCloseDate(e.target.value)}
              value={closeDate}
            />
          </div>
        </div>

        <div className="section">
          <h4>
            Add your cover photo <span className="marked">Required</span>
          </h4>
          <div
            className="image-preview"
            style={{
              backgroundImage: `url(${business && business.Cover_photo})`,
            }}
          ></div>
          <div className="info">Minimum size must be 1200x800 pixels.</div>
          {addPhoto[0] && (
            <div className="input-box">
              <input
                type="url"
                placeholder="https://example.com/image.jpg"
                onChange={(e) => setCoverPhoto(e.target.value.trim())}
                value={coverPhoto}
              />
            </div>
          )}
          <button
            className="upload-btn"
            type="button"
            onClick={() => {
              setAddPhoto([!addPhoto[0], addPhoto[1]]);
              if (coverPhoto) {
                updateProfile();
                setBusiness({ ...business, Cover_photo: coverPhoto });
              }
            }}
          >
            {addPhoto[0] ? "Update photo" : "Add photo"}
          </button>
        </div>

        <div className="section">
          <h4>
            Add your logo <span className="marked">Required</span>
          </h4>
          <div
            className="image-preview"
            style={{
              backgroundImage: `url(${business && business.Logo})`,
            }}
          ></div>
          <div className="info">
            We'll crop your photo to 200 pixels in width.
          </div>
          {addPhoto[1] && (
            <div className="input-box">
              <input
                type="url"
                placeholder="https://example.com/image.png"
                onChange={(e) => setLogo(e.target.value)}
                value={logo}
                required
              />
            </div>
          )}
          <button
            className="upload-btn"
            type="button"
            onClick={() => {
              setAddPhoto([addPhoto[0], !addPhoto[1]]);
              if (logo) {
                updateProfile();
                setBusiness({ ...business, Logo: logo });
              }
            }}
          >
            {addPhoto[1] ? "Update photo" : "Add photo"}
          </button>
        </div>

        <div className="section">
          <h4>
            Description <span className="marked">Required</span>
          </h4>
          <div className="info">
            Add details about your business to help members get to know more
            about your unique offerings.
          </div>
          <div>
            <textarea
              className="text-box"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            ></textarea>
          </div>
        </div>

        <div className="section">
          <h4>Contacts</h4>
          <div className="input-box">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              placeholder="01xxx-xxxxxx"
              onChange={(e) => setPhone(e.target.value.trim())}
              value={phone}
            />
          </div>
          <div className="input-box">
            <label htmlFor="facebook">Facebook</label>
            <input
              type="url"
              id="facebook"
              placeholder="https://fb.com/profile"
              onChange={(e) => setFacebook(e.target.value)}
              value={facebook}
            />
          </div>
          <div className="input-box">
            <label htmlFor="instagram">Instagram</label>
            <input
              type="url"
              id="instagram"
              placeholder="https://instagram.com/profile"
              onChange={(e) => setInstagram(e.target.value)}
              value={instagram}
            />
          </div>
          <div className="input-box">
            <label htmlFor="twitter">Twitter</label>
            <input
              type="url"
              id="twitter"
              placeholder="https://twitter.com/profile"
              onChange={(e) => setTwitter(e.target.value)}
              value={twitter}
            />
          </div>
          <div className="input-box">
            <label htmlFor="yelp">Yelp</label>
            <input
              type="url"
              id="yelp"
              placeholder="https://yelp.com/profile"
              onChange={(e) => setYelp(e.target.value)}
              value={yelp}
            />
          </div>
        </div>
        <div className="section">
          <h4>Business attributes</h4>
          <div className="info">
            Let ClassPass members know more about your business.
          </div>
          <div className="check-group">
            <div className="input-box">
              <input
                id="at1"
                type="checkbox"
                onChange={() => toggleAttributes("Asian-owned")}
                checked={attributes.includes("Asian-owned")}
              />
              <label htmlFor="at1">Asian-owned</label>
            </div>
            <div className="input-box">
              <input
                id="at2"
                type="checkbox"
                onChange={() => toggleAttributes("Black-owned")}
                checked={attributes.includes("Black-owned")}
              />
              <label htmlFor="at2">Black-owned</label>
            </div>
            <div className="input-box">
              <input
                id="at3"
                type="checkbox"
                onChange={() => toggleAttributes("Hispanic/Latinx-owned")}
                checked={attributes.includes("Hispanic/Latinx-owned")}
              />
              <label htmlFor="at3">Hispanic/Latinx-owned</label>
            </div>
            <div className="input-box">
              <input
                id="at4"
                type="checkbox"
                onChange={() => toggleAttributes("Woman-owned")}
                checked={attributes.includes("Woman-owned")}
              />
              <label htmlFor="at4">Woman-owned</label>
            </div>
            <div className="input-box">
              <input
                id="at5"
                type="checkbox"
                onChange={() => toggleAttributes("LGBTQ-owned")}
                checked={attributes.includes("LGBTQ-owned")}
              />
              <label htmlFor="at5">LGBTQ-owned</label>
            </div>
          </div>
        </div>
        <div className="section">
          <h4>Amenities</h4>
          <div className="info">
            Help users know what to expect at your facilities.
          </div>
          <div className="check-group">
            <div className="input-box">
              <input
                id="am1"
                type="checkbox"
                onChange={() => toggleAmenities("Childcare")}
                checked={amenities.includes("Childcare")}
              />
              <label htmlFor="am1">Childcare</label>
            </div>
            <div className="input-box">
              <input
                id="am2"
                type="checkbox"
                onChange={() => toggleAmenities("Food/Beverages")}
                checked={amenities.includes("Food/Beverages")}
              />
              <label htmlFor="am2">Food/Beverages</label>
            </div>
            <div className="input-box">
              <input
                id="am3"
                type="checkbox"
                onChange={() => toggleAmenities("Hairdryer")}
                checked={amenities.includes("Hairdryer")}
              />
              <label htmlFor="am3">Hairdryer</label>
            </div>
            <div className="input-box">
              <input
                id="am4"
                type="checkbox"
                onChange={() => toggleAmenities("Lockers")}
                checked={amenities.includes("Lockers")}
              />
              <label htmlFor="am4">Lockers</label>
            </div>
            <div className="input-box">
              <input
                id="am5"
                type="checkbox"
                onChange={() => toggleAmenities("Parking")}
                checked={amenities.includes("Parking")}
              />
              <label htmlFor="am5">Parking</label>
            </div>
          </div>
        </div>
        <div className="section">
          <h4>How to get there</h4>
          <div className="info">
            Add any notes to help members easily find your location. This
            information will be sent to members who make a reservation. (1200
            characters)
          </div>
          <div>
            <textarea
              className="text-box"
              onChange={(e) => setHowtoGetThere(e.target.value)}
              value={howtoGetThere}
            ></textarea>
          </div>
        </div>
        <div className="section">
          <h4>How to prepare</h4>
          <div className="info">
            Include what to bring, what to wear, and anything else a member
            should know. This information will be sent to members who make a
            reservation. (1200 characters)
          </div>
          <div>
            <textarea
              className="text-box"
              onChange={(e) => setHowtoPrepare(e.target.value)}
              value={howtoPrepare}
            ></textarea>
          </div>
          <button type="submit" className="btn profile-save-btn">
            {business ? "Update profile" : "Save profile"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default BusinessProfile;
