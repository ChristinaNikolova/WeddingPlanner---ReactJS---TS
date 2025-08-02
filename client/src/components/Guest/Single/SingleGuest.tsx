import { useState } from "react";
import * as images from "../../../utils/constants/images";
import { dishes, people, genders } from "../../../utils/constants/global";
import styles from "./SingleGuest.module.css";

// todo interface
interface SingleGuestProps {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  age: string;
  role: string;
  side: string;
  table: string;
  mainDish: string;
  confirmed: string;
  isEditIconHidden: boolean;
  onDeleteHandler: (id: string) => void;
  onShowFormHandler: (id: string) => void;
}

function SingleGuest({
  id,
  firstName,
  lastName,
  gender,
  age,
  role,
  side,
  table,
  mainDish,
  confirmed,
  isEditIconHidden,
  onDeleteHandler,
  onShowFormHandler,
}: SingleGuestProps) {
  const [isHovering, setIsHovering] = useState(false);

  const getPersonImage = (age: string, gender: string): string => {
    let image = "";

    if (age === people.ADULT && gender === genders.MALE) {
      image = images.personIcons.ADULT_MALE;
    } else if (age === people.ADULT && gender === genders.FEMALE) {
      image = images.personIcons.ADULT_FEMALE;
    } else if (age === people.CHILD && gender === genders.MALE) {
      image = images.personIcons.CHILD_MALE;
    } else if (age === people.CHILD && gender === genders.FEMALE) {
      image = images.personIcons.CHILD_FEMALE;
    } else if (age === people.BABY) {
      image = images.personIcons.BABY;
    }

    return image;
  };

  const getDishImage = (mainDish: string): string => {
    let image = "";

    if (mainDish === dishes.MEAT) {
      image = images.dishIcons.MEAT;
    } else if (mainDish === dishes.FISH) {
      image = images.dishIcons.FISH;
    } else if (mainDish === dishes.VEGGIES) {
      image = images.dishIcons.VEGGIES;
    }

    return image;
  };

  const onMouseEnterHandler = (): void => {
    setIsHovering(true);
  };

  const onMouseLeaveHandler = (): void => {
    setIsHovering(false);
  };

  return (
    <div className={styles["guests-all-info-wrapper"]}>
      <div className={styles["guests-all-info-left"]}>
        <p className={styles["guests-all-role"]}>{role}</p>
        <p
          onMouseEnter={onMouseEnterHandler}
          onMouseLeave={onMouseLeaveHandler}
          className={styles["guests-all-name"]}
        >
          {firstName} {lastName}
          <span className={styles["guests-all-image"]}>
            {getPersonImage(age, gender)}
          </span>
          {isHovering && (
            <span className={styles["guests-all-icons"]}>
              {!isEditIconHidden && (
                <i
                  onClick={() => onShowFormHandler(id)}
                  className="fa-solid fa-pen"
                ></i>
              )}
              {role !== "bride" && role !== "groom" && !isEditIconHidden && (
                <i
                  onClick={() => onDeleteHandler(id)}
                  className="fa-solid fa-trash"
                ></i>
              )}
            </span>
          )}
        </p>
        <p className={styles["guests-all-side"]}>
          <span className={styles["guests-all-info-title"]}>Side:</span>
          {side}
        </p>
      </div>
      <div className={styles["guests-all-info-right"]}>
        <p className={styles["guests-all-info"]}>
          <span className={styles["guests-all-info-title"]}>Table:</span>
          {table === "" ? "no info" : table}
        </p>
        <p className={styles["guests-all-info"]}>
          <span className={styles["guests-all-info-title"]}>Confirmed:</span>
          {confirmed ? (
            <i className="fa-solid fa-check"></i>
          ) : (
            <i className="fa-solid fa-xmark"></i>
          )}
        </p>
        <p className={styles["guests-all-info"]}>
          <span className={styles["guests-all-info-title"]}>Dish:</span>
          {mainDish === "no info" ? mainDish : getDishImage(mainDish)}
        </p>
      </div>
    </div>
  );
}

export default SingleGuest;
