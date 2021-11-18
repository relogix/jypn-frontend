import ContentHeader from "../../../../components/ContentHeader";
import Button from "../../../../components/inputForm/Button";
import { List, ListItem } from "../../../../components/List";

const Upcoming = () => {
  return (
    <div>
      <div className="px-6 md:px-12 py-8 ">
        <div className="flex justify-between items-center mb-8">
          <ContentHeader className="flex-1">Upcoming Events</ContentHeader>
          <Button>See More</Button>
        </div>

        <div>
          <List>
            <ListItem>
              <span className="font-medium">JYPn Debut</span>
              <span className="italic text-xs">2022-02-01</span>
            </ListItem>
            <ListItem>
              <span className="font-medium">JYPn Debut</span>
              <span className="italic text-xs">2022-02-01</span>
            </ListItem>
            <ListItem>
              <span className="font-medium">JYPn Debut</span>
              <span className="italic text-xs">2022-02-01</span>
            </ListItem>
            <ListItem>
              <span className="font-medium">JYPn Debut</span>
              <span className="italic text-xs">2022-02-01</span>
            </ListItem>
            <ListItem>
              <span className="font-medium">JYPn Debut</span>
              <span className="italic text-xs">2022-02-01</span>
            </ListItem>
          </List>
        </div>
      </div>
    </div>
  );
};

export default Upcoming;
