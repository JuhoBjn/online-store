import { useState, useContext } from "react";
import { useLoaderData } from "react-router-dom";

import { AuthContext } from "../../utils/AuthContext";
import Button from "../../components/button/Button";
import { updateProfile } from "../../utils/UsersAPI";

import "./EditProfile.css";

const EditProfile = () => {
  const [userProfile, setUserProfile] = useState(useLoaderData());
  const [profileUpdated, setProfileUpdated] = useState(false);
  const authContext = useContext(AuthContext);

  const updateUserProfileState = (event) => {
    event.preventDefault();
    console.log(event.target.name, event.target.value);
    setUserProfile((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  const profileUpdateHandler = async (event) => {
    event.preventDefault();

    const response = await updateProfile(
      authContext.id,
      authContext.token,
      userProfile
    );

    if (response) {
      console.log("Profile updated successfully");
      setProfileUpdated(true);
    } else {
      console.log("Profile update failed");
    }
  };

  return (
    <div className="edit-profile-page">
      <div className="edit-profile-form-container">
        <h2>Profile editing</h2>
        <form onSubmit={profileUpdateHandler}>
          <div className="edit-profile-sidebyside-input-container">
            <div className="edit-profile-firstname-input-container">
              <label htmlFor="firstname-input">First name</label>
              <input
                id="firstname-input"
                data-testid="firstname-input"
                name="firstname"
                type="text"
                placeholder="First name"
                value={userProfile.firstname}
                onChange={() => updateUserProfileState(event)}
              />
            </div>
            <div className="edit-profile-lastname-input-container">
              <label htmlFor="lastname-input">Last name</label>
              <input
                id="lastname-input"
                data-testid="lastname-input"
                name="lastname"
                type="text"
                placeholder="Last name"
                value={userProfile.lastname}
                onChange={() => updateUserProfileState(event)}
              />
            </div>
          </div>
          <label htmlFor="bio-input">Bio</label>
          <textarea
            id="bio-input"
            data-testid="bio-input"
            name="bio"
            placeholder="Enter your bio here"
            value={userProfile.bio}
            onChange={() => updateUserProfileState(event)}
          />
          <label htmlFor="email-input">Email</label>
          <input
            id="email-input"
            data-testid="email-input"
            name="email"
            type="email"
            placeholder="Email"
            value={userProfile.email}
            onChange={() => updateUserProfileState(event)}
          />
          <label htmlFor="phone-input">Phone number</label>
          <input
            id="phone-input"
            data-testid="phone-input"
            name="phone"
            type="tel"
            placeholder="Phone"
            value={userProfile.phone}
            onChange={() => updateUserProfileState(event)}
          />
          <div className="edit-profile-sidebyside-input-container">
            <div>
              <label htmlFor="city-input">City</label>
              <input
                id="city-input"
                data-testid="city-input"
                name="city"
                type="text"
                placeholder="City"
                value={userProfile.city}
                onChange={() => updateUserProfileState(event)}
              />
            </div>
            <div>
              <label htmlFor="postalcode-input">Postal code</label>
              <input
                id="postalcode-input"
                data-testid="postalcode-input"
                name="postalcode"
                type="text"
                placeholder="Postal code"
                value={userProfile.postalcode}
                onChange={() => updateUserProfileState(event)}
              />
            </div>
          </div>
          <label htmlFor="country-input">Country</label>
          <select
            name="country"
            className="country-dropdown"
            id="country-input"
            data-testid="country-input"
            defaultValue={userProfile.country}
            value={userProfile.country}
            onChange={() => updateUserProfileState(event)}
          >
            <option value="af">Afghanistan</option>
            <option value="ax">Åland Islands</option>
            <option value="al">Albania</option>
            <option value="dz">Algeria</option>
            <option value="as">American Samoa</option>
            <option value="ad">Andorra</option>
            <option value="ao">Angola</option>
            <option value="ai">Anguilla</option>
            <option value="aq">Antarctica</option>
            <option value="ag">Antigua and Barbuda</option>
            <option value="ar">Argentina</option>
            <option value="am">Armenia</option>
            <option value="aw">Aruba</option>
            <option value="au">Australia</option>
            <option value="at">Austria</option>
            <option value="az">Azerbaijan</option>
            <option value="bs">Bahamas</option>
            <option value="bh">Bahrain</option>
            <option value="bd">Bangladesh</option>
            <option value="bb">Barbados</option>
            <option value="by">Belarus</option>
            <option value="be">Belgium</option>
            <option value="bz">Belize</option>
            <option value="bj">Benin</option>
            <option value="bm">Bermuda</option>
            <option value="bt">Bhutan</option>
            <option value="bo">Bolivia</option>
            <option value="ba">Bosnia and Herzegovina</option>
            <option value="bw">Botswana</option>
            <option value="bv">Bouvet Island</option>
            <option value="br">Brazil</option>
            <option value="io">British Indian Ocean Territory</option>
            <option value="bn">Brunei Darussalam</option>
            <option value="bg">Bulgaria</option>
            <option value="bf">Burkina Faso</option>
            <option value="bi">Burundi</option>
            <option value="kh">Cambodia</option>
            <option value="cm">Cameroon</option>
            <option value="ca">Canada</option>
            <option value="cv">Cape Verde</option>
            <option value="ky">Cayman Islands</option>
            <option value="cf">Central African Republic</option>
            <option value="td">Chad</option>
            <option value="cl">Chile</option>
            <option value="cn">China</option>
            <option value="cx">Christmas Island</option>
            <option value="cc">Cocos (Keeling) Islands</option>
            <option value="co">Colombia</option>
            <option value="km">Comoros</option>
            <option value="cg">Congo</option>
            <option value="cd">Congo, The Democratic Republic of The</option>
            <option value="ck">Cook Islands</option>
            <option value="cr">Costa Rica</option>
            <option value="ci">Cote D&apos;ivoire</option>
            <option value="hr">Croatia</option>
            <option value="cu">Cuba</option>
            <option value="cy">Cyprus</option>
            <option value="cz">Czechia</option>
            <option value="dk">Denmark</option>
            <option value="dj">Djibouti</option>
            <option value="dm">Dominica</option>
            <option value="do">Dominican Republic</option>
            <option value="ec">Ecuador</option>
            <option value="eg">Egypt</option>
            <option value="sv">El Salvador</option>
            <option value="gq">Equatorial Guinea</option>
            <option value="er">Eritrea</option>
            <option value="ee">Estonia</option>
            <option value="et">Ethiopia</option>
            <option value="fk">Falkland Islands (Malvinas)</option>
            <option value="fo">Faroe Islands</option>
            <option value="fj">Fiji</option>
            <option value="fi">Finland</option>
            <option value="fr">France</option>
            <option value="gf">French Guiana</option>
            <option value="pf">French Polynesia</option>
            <option value="tf">French Southern Territories</option>
            <option value="ga">Gabon</option>
            <option value="gm">Gambia</option>
            <option value="ge">Georgia</option>
            <option value="de">Germany</option>
            <option value="gh">Ghana</option>
            <option value="gi">Gibraltar</option>
            <option value="gr">Greece</option>
            <option value="gl">Greenland</option>
            <option value="gd">Grenada</option>
            <option value="gp">Guadeloupe</option>
            <option value="gu">Guam</option>
            <option value="gt">Guatemala</option>
            <option value="gg">Guernsey</option>
            <option value="gn">Guinea</option>
            <option value="gw">Guinea-bissau</option>
            <option value="gy">Guyana</option>
            <option value="ht">Haiti</option>
            <option value="hm">Heard Island and Mcdonald Islands</option>
            <option value="va">Holy See (Vatican City State)</option>
            <option value="hn">Honduras</option>
            <option value="hk">Hong Kong</option>
            <option value="hu">Hungary</option>
            <option value="is">Iceland</option>
            <option value="in">India</option>
            <option value="id">Indonesia</option>
            <option value="ir">Iran, Islamic Republic of</option>
            <option value="iq">Iraq</option>
            <option value="ie">Ireland</option>
            <option value="im">Isle of Man</option>
            <option value="il">Israel</option>
            <option value="it">Italy</option>
            <option value="jm">Jamaica</option>
            <option value="jp">Japan</option>
            <option value="je">Jersey</option>
            <option value="jo">Jordan</option>
            <option value="kz">Kazakhstan</option>
            <option value="ke">Kenya</option>
            <option value="ki">Kiribati</option>
            <option value="kp">
              Korea, Democratic People&apos;s Republic of
            </option>
            <option value="kr">Korea, Republic of</option>
            <option value="kw">Kuwait</option>
            <option value="kg">Kyrgyzstan</option>
            <option value="la">Lao People&apos;s Democratic Republic</option>
            <option value="lv">Latvia</option>
            <option value="lb">Lebanon</option>
            <option value="ls">Lesotho</option>
            <option value="lr">Liberia</option>
            <option value="ly">Libyan Arab Jamahiriya</option>
            <option value="li">Liechtenstein</option>
            <option value="lt">Lithuania</option>
            <option value="lu">Luxembourg</option>
            <option value="mo">Macao</option>
            <option value="mk">
              Macedonia, The Former Yugoslav Republic of
            </option>
            <option value="mg">Madagascar</option>
            <option value="mw">Malawi</option>
            <option value="my">Malaysia</option>
            <option value="mv">Maldives</option>
            <option value="ml">Mali</option>
            <option value="mt">Malta</option>
            <option value="mh">Marshall Islands</option>
            <option value="mq">Martinique</option>
            <option value="mr">Mauritania</option>
            <option value="mu">Mauritius</option>
            <option value="yt">Mayotte</option>
            <option value="mx">Mexico</option>
            <option value="fm">Micronesia, Federated States of</option>
            <option value="md">Moldova, Republic of</option>
            <option value="mc">Monaco</option>
            <option value="mn">Mongolia</option>
            <option value="me">Montenegro</option>
            <option value="ms">Montserrat</option>
            <option value="ma">Morocco</option>
            <option value="mz">Mozambique</option>
            <option value="mm">Myanmar</option>
            <option value="na">Namibia</option>
            <option value="nr">Nauru</option>
            <option value="np">Nepal</option>
            <option value="nl">Netherlands</option>
            <option value="an">Netherlands Antilles</option>
            <option value="nc">New Caledonia</option>
            <option value="nz">New Zealand</option>
            <option value="ni">Nicaragua</option>
            <option value="ne">Niger</option>
            <option value="ng">Nigeria</option>
            <option value="nu">Niue</option>
            <option value="nf">Norfolk Island</option>
            <option value="mp">Northern Mariana Islands</option>
            <option value="no">Norway</option>
            <option value="om">Oman</option>
            <option value="pk">Pakistan</option>
            <option value="pw">Palau</option>
            <option value="ps">Palestinian Territory, Occupied</option>
            <option value="pa">Panama</option>
            <option value="pg">Papua New Guinea</option>
            <option value="py">Paraguay</option>
            <option value="pe">Peru</option>
            <option value="ph">Philippines</option>
            <option value="pn">Pitcairn</option>
            <option value="pl">Poland</option>
            <option value="pt">Portugal</option>
            <option value="pr">Puerto Rico</option>
            <option value="qa">Qatar</option>
            <option value="re">Reunion</option>
            <option value="ro">Romania</option>
            <option value="ru">Russian Federation</option>
            <option value="rw">Rwanda</option>
            <option value="sh">Saint Helena</option>
            <option value="kn">Saint Kitts and Nevis</option>
            <option value="lc">Saint Lucia</option>
            <option value="pm">Saint Pierre and Miquelon</option>
            <option value="vc">Saint Vincent and The Grenadines</option>
            <option value="ws">Samoa</option>
            <option value="sm">San Marino</option>
            <option value="st">Sao Tome and Principe</option>
            <option value="sa">Saudi Arabia</option>
            <option value="sn">Senegal</option>
            <option value="rs">Serbia</option>
            <option value="sc">Seychelles</option>
            <option value="sl">Sierra Leone</option>
            <option value="sg">Singapore</option>
            <option value="sk">Slovakia</option>
            <option value="si">Slovenia</option>
            <option value="sb">Solomon Islands</option>
            <option value="so">Somalia</option>
            <option value="za">South Africa</option>
            <option value="gs">
              South Georgia and The South Sandwich Islands
            </option>
            <option value="es">Spain</option>
            <option value="lk">Sri Lanka</option>
            <option value="sd">Sudan</option>
            <option value="sr">Suriname</option>
            <option value="sj">Svalbard and Jan Mayen</option>
            <option value="sz">Swaziland</option>
            <option value="se">Sweden</option>
            <option value="ch">Switzerland</option>
            <option value="sy">Syrian Arab Republic</option>
            <option value="tw">Taiwan, Province of China</option>
            <option value="tj">Tajikistan</option>
            <option value="tz">Tanzania, United Republic of</option>
            <option value="th">Thailand</option>
            <option value="tl">Timor-leste</option>
            <option value="tg">Togo</option>
            <option value="tk">Tokelau</option>
            <option value="to">Tonga</option>
            <option value="tt">Trinidad and Tobago</option>
            <option value="tn">Tunisia</option>
            <option value="tr">Turkey</option>
            <option value="tm">Turkmenistan</option>
            <option value="tc">Turks and Caicos Islands</option>
            <option value="tv">Tuvalu</option>
            <option value="ug">Uganda</option>
            <option value="ua">Ukraine</option>
            <option value="ae">United Arab Emirates</option>
            <option value="gb">United Kingdom</option>
            <option value="us">United States</option>
            <option value="um">United States Minor Outlying Islands</option>
            <option value="uy">Uruguay</option>
            <option value="uz">Uzbekistan</option>
            <option value="vu">Vanuatu</option>
            <option value="ve">Venezuela</option>
            <option value="vn">Viet Nam</option>
            <option value="vg">Virgin Islands, British</option>
            <option value="vi">Virgin Islands, U.S.</option>
            <option value="wf">Wallis and Futuna</option>
            <option value="eh">Western Sahara</option>
            <option value="ye">Yemen</option>
            <option value="zm">Zambia</option>
            <option value="zw">Zimbabwe</option>{" "}
          </select>
          <div className="edit-profile-submit-container">
            {profileUpdated ? (
              <p>&#x2714; Profile updated</p>
            ) : (
              <Button type="action">Update profile</Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
