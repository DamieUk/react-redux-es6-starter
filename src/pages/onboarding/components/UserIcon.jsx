import React from 'react';

const imagePlaceholder = '/images/icons/icon-user.svg';

class UserIcon extends React.PureComponent {
  render() {
    const { imageUrl, ...otherProps } = this.props;
    return (
      <div
        className="user-image-preview center-block"
        {...otherProps}
      >
        <div className="user-image" style={{ backgroundImage: `url(${imageUrl || imagePlaceholder})` }} />
        <div className="icon-plus" />
      </div>
    );
  }
}

export default UserIcon;
