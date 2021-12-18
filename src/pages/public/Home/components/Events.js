import React, { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import moment from "moment";
import { Button } from "@chakra-ui/react";
import he from "he";

const Events = () => {
  const [currentMonth, setCurrentMonth] = useState("");
  const viewCalendar = (arg) => {
    const data = arg?.view?.getCurrentData();

    setCurrentMonth(data?.viewTitle);
  };

  return (
    <div
      className="w-full flex flex-col md:flex-row items-center px-8 md:px-20 pt-12 pb-24 text-white"
      style={{ backgroundColor: "#111" }}
    >
      <div className="md:w-1/3 justify-between items-center">
        <div className>
          <h2 className="poppins font-bold text-4xl md:text-5xl uppercase bg-clip-text text-transparent bg-gradient-primary">
            Upcoming Events
          </h2>
          <p className="mt-2 text-gray-400 uppercase italic tracking-widest">{currentMonth}</p>
          <Button
            variant="outline"
            className="hidden md:inline mt-4 hover:bg-white hover:bg-opacity-5"
            onClick={() => window.open(process.env.REACT_APP_GOOGLE_CALENDAR_URL)}
          >
            See All Events
          </Button>
        </div>
      </div>
      <div className="flex-1 w-full">
        <FullCalendar
          viewDidMount={viewCalendar}
          height={500}
          plugins={[googleCalendarPlugin, dayGridPlugin, listPlugin]}
          initialView="listMonth"
          googleCalendarApiKey={process.env.REACT_APP_GOOGLE_API_KEY}
          events={{ googleCalendarId: process.env.REACT_APP_GOOGLE_CALENDAR_ID }}
          headerToolbar={{
            left: "",
            right: "",
          }}
          eventDataTransform={(e) => {
            e.title = he.decode(e.title);
            return e;
          }}
          eventDidMount={(info) => {
            const description = info.event.extendedProps.description;
            const dotColor = description?.includes("youtube") ? "border-red-500" : "border-blue-500";

            const dotEl = info.el.getElementsByClassName("fc-list-event-dot")[0];
            dotEl.classList.add(dotColor);
          }}
          eventClick={(e) => {
            e.jsEvent.preventDefault();
            e.event.url && window.open(e.event.url);
          }}
        />
      </div>
      <div className="flex md:hidden justify-center mt-4">
        <Button
          variant="outline"
          className="mt-4 hover:bg-white hover:bg-opacity-5"
          onClick={() => window.open(process.env.REACT_APP_GOOGLE_CALENDAR_URL)}
        >
          See All Events
        </Button>
      </div>
    </div>
  );
};

export default Events;
