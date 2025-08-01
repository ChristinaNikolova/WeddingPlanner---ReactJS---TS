import { useState } from "react";
import styles from "./SingleEvent.module.css";

// todo interfaces...
// todo start/end time types
interface SingleEvent {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  duration: number;
  isHighlighted: boolean;
  isEditIconHidden: boolean;
  onHeightlightHandler: (eventId: string) => void;
  onDeleteHandler: (eventId: string) => void;
  onShowFormHandler: (eventId: string) => void;
}

function SingleEvent({
  id,
  title,
  startTime,
  endTime,
  duration,
  isHighlighted,
  isEditIconHidden,
  onHeightlightHandler,
  onDeleteHandler,
  onShowFormHandler,
}: SingleEvent) {
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const getStyles = (): string => {
    return isHighlighted
      ? `${styles["events-all-info-wrapper"]} ${styles["event-all-heightlight"]}`
      : styles["events-all-info-wrapper"];
  };

  const onMouseEnterHandler = (): void => {
    setIsHovering(true);
  };

  const onMouseLeaveHandler = (): void => {
    setIsHovering(false);
  };

  return (
    <div className={styles["events-all-main-wrapper"]}>
      <div
        onMouseEnter={onMouseEnterHandler}
        onMouseLeave={onMouseLeaveHandler}
        className={getStyles()}
      >
        <div className={styles["events-all-info-left"]}>
          <p className={styles["events-all-time"]}>
            {startTime} - {endTime}
          </p>
          <p className={styles["events-all-duration"]}>
            {duration}
            <span className={styles["events-all-duration-unit"]}>minutes</span>
          </p>
        </div>
        <div className={styles["events-all-info-right"]}>
          <p className={styles["events-all-title"]}>{title}</p>
          {isHovering && (
            <span className={styles["events-all-icons"]}>
              {!isEditIconHidden && (
                <i
                  onClick={() => onShowFormHandler(id)}
                  className="fa-solid fa-pen"
                ></i>
              )}
              {!isEditIconHidden && (
                <i
                  onClick={() => onDeleteHandler(id)}
                  className="fa-solid fa-trash"
                ></i>
              )}
            </span>
          )}
        </div>
        <div className={styles["events-all-star-icons-wrapper"]}>
          {isHighlighted ? (
            <i
              onClick={() => onHeightlightHandler(id)}
              className="fa-solid fa-star"
            ></i>
          ) : (
            <i
              onClick={() => onHeightlightHandler(id)}
              className="fa-regular fa-star"
            ></i>
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleEvent;
