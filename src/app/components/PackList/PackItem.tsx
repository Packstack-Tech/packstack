import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { Popconfirm } from "antd";

import { getPackPath } from "routes";
import { PackOverview } from "types/pack";

import { PackWrapper, Metadata, UserOptions } from "./styles";

interface Props {
  pack: PackOverview;
  currentUserId?: number;
  deletePack?: (id: number) => void;
  copyPack?: (id: number) => void;
}

const PackItem: React.FC<Props & RouteComponentProps> = ({
  pack,
  currentUserId,
  deletePack,
  copyPack,
}) => {
  const { id, title } = pack;

  const metadata = () => {
    const { duration, duration_unit, season, itemCount } = pack;
    const durationDisplay = !!duration && (
      <div>
        {duration} {duration_unit}
      </div>
    );
    const seasonDisplay = !!season && <div>{season}</div>;
    return (
      <Metadata>
        <div>{itemCount} Items</div>
        {durationDisplay}
        {seasonDisplay}
      </Metadata>
    );
  };

  const handleDelete = () => {
    if (deletePack) {
      deletePack(pack.id);
    }
  };

  function copy() {
    if (copyPack) {
      copyPack(pack.id);
    }
  }

  const userOptions = () => {
    if (pack.user.id !== currentUserId) {
      return null;
    }

    return (
      <UserOptions>
        {pack.public && <a href={getPackPath(id, title)}>view</a>}
        <Link to={`/pack/${id}`}>edit</Link>
        <a href="#" onClick={copy}>
          copy
        </a>
        <Popconfirm
          title="Are you sure you want to delete this pack?"
          okText="Delete"
          placement="bottom"
          onConfirm={handleDelete}
        >
          <a href="#" className="remove-link">
            delete
          </a>
        </Popconfirm>
      </UserOptions>
    );
  };

  return (
    <PackWrapper>
      <Link to={`/pack/${id}`} className="pack-link">
        {title}
      </Link>
      {metadata()}
      {userOptions()}
    </PackWrapper>
  );
};

export default withRouter(PackItem);
