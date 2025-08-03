import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreateGuest from "../Create/CreateGuest";
import UpdateGuest from "../Update/UpdateGuest";
import SingleGuest from "../Single/SingleGuest";
import AddButton from "../../shared/Buttons/Add/AddButton";
import type { GuestProps } from "../../../interfaces/props/GuestProps";
import * as guestsService from "../../../services/guests";
import { scrollToTop } from "../../../utils/helpers/form";
import { addButtonTexts } from "../../../utils/constants/global";
import styles from "./GuestsAll.module.css";

const GuestsAll = () => {
  const { id: plannerId } = useParams();
  const [guestId, setGuestId] = useState<string>("");
  const [guests, setGuests] = useState<GuestProps[]>([]);
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [isEditIconHidden, setIsEditIconHidden] = useState<boolean>(false);

  useEffect(() => {
    loadGuests();
  }, []);

  const onCancelFormHandler = (): void => {
    setIsHidden(true);
    setIsEditIconHidden(false);
    setGuestId("");
  };

  const onShowFormHandler = (guestId: string): void => {
    setIsHidden(!isHidden);
    setGuestId(guestId || "");
    setIsEditIconHidden(!isEditIconHidden);
  };

  const onDeleteHandler = (guestId: string): void => {
    guestsService
      .deleteById(guestId)
      .then(() => {
        loadGuests();
      })
      .catch((err) => console.error(err));
  };

  const loadGuests = (): void => {
    guestsService
      .all(plannerId!)
      .then((res) => {
        setGuests(res);
        scrollToTop();
      })
      .catch((err) => console.error(err));
  };

  const finish = (): void => {
    onCancelFormHandler();
    loadGuests();
  };

  return (
    <section
      id={styles["guests-all"]}
      className="section-planner section-background"
    >
      <div className="section-title-wrapper">
        <h2 className="section-title">Guests</h2>
      </div>
      <div className={styles["guests-all-main-content-wrapper"]}>
        {guests.map((g) => (
          <SingleGuest
            key={g.id}
            id={g.id}
            firstName={g.firstName}
            lastName={g.lastName}
            gender={g.gender}
            age={g.age}
            role={g.role}
            side={g.side}
            table={g.table}
            mainDish={g.mainDish}
            confirmed={g.confirmed}
            isEditIconHidden={isEditIconHidden}
            onDeleteHandler={onDeleteHandler}
            onShowFormHandler={onShowFormHandler}
          />
        ))}
      </div>
      {guestId ? (
        <UpdateGuest
          guestId={guestId}
          plannerId={plannerId!}
          onCancelFormHandler={onCancelFormHandler}
          finish={finish}
        />
      ) : (
        <>
          <AddButton
            classNames={["guest-form-icon"]}
            text={addButtonTexts.GUEST}
            isEmptyString={true}
            onShowFormHandler={onShowFormHandler}
          />
          <CreateGuest
            plannerId={plannerId!}
            isHidden={isHidden}
            onCancelFormHandler={onCancelFormHandler}
            finish={finish}
          />
        </>
      )}
    </section>
  );
};

export default GuestsAll;
