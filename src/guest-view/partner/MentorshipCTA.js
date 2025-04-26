import React from "react";

const MentorshipCTA = () => {
  return (
    <div className="mentorship_cta_bg">
      <div className="mentorship_cta_container">
        <div className="mentorship_cta_child">
          <h2>Mentors</h2>
          <p>
            Join our platform to share your expertise, build meaningful
            connections, and unlock new opportunities. Share your knowledge,
            guide aspiring professionals, and help them achieve their career
            goals. Our platform provides you with the tools to mentor
            effectively and get rewarded for your expertise.
          </p>
          <div className="mentorship_cta_items">
            <div>
              <h5>Expand Your Influence</h5>
              <span>
                Position yourself as a thought leader in your industry and
                enhance your credibility.
              </span>
            </div>
            <div>
              <h5>Personal Growth</h5>
              <span>
                Refine your leadership, communication, and mentor skills while
                engaging with diverse mentees.
              </span>
            </div>
            <div>
              <h5>Meaningful Connections</h5>
              <span>
                Network with ambitious professionals and industry leaders to
                open new opportunities.
              </span>
            </div>
          </div>
          <hr />
          <ul className="mentorship_cta_item-2">
            <h4> Benefits of Joining as a Mentor: </h4>
            <li>Gain recognition as an industry expert.</li>
            <li>Expand your professional network.</li>
            <li>Earn while making a positive impact.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MentorshipCTA;
