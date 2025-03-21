import PropTypes from "prop-types";
import { Button } from "../Button";

export const Card = ({ id, heading, description, createdAt, onDelete }) => {
  return (
    <div className="h-full w-full rounded-lg bg-white shadow-lg">
      <div className="p-4">
        <h2 className="mb-2 text-xl font-semibold">{heading}</h2>
        <p className="text-gray-700">{description}</p>
        <div className="mt-4 flex h-full flex-row items-center gap-2">
          <p className="flex-1 text-left text-sm text-gray-500">
            Created at: {new Date(createdAt).toLocaleString()}
          </p>
          <div className="flex gap-2">
            <Button color="blue" onClick={() => {}} message="Edit" />
            <Button
              color="red"
              onClick={() => {
                onDelete(id);
              }}
              message="Delete"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  id: PropTypes.number.isRequired,
  heading: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  createdAt: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
};
