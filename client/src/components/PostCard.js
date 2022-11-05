import { Card, Icon, Button, Image, Label } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

export default function PostCard({
  post: { body, createdAt, id, userName, likeCount, commentCount, likes },
}) {
  return (
    <>
      <Card fluid>
        <Card.Content>
          <Image
            floated="right"
            size="tiny"
            circular
            src={process.env.PUBLIC_URL + "/img/winter2.jpeg"}
          />
          <Card.Header>{userName}</Card.Header>
          <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
          <Card.Description>{body}</Card.Description>
        </Card.Content>

        <Card.Content extra>
          <Button as="div" labelPosition="right">
            <Button basic color="red">
              <Icon name="heart" />
            </Button>
            <Label basic color="red" pointing="left">
              {likeCount}
            </Label>
          </Button>
          <Button as="div" labelPosition="right">
            <Button basic color="blue">
              <Icon name="comment" />
            </Button>
            <Label basic color="blue" pointing="left">
              {commentCount}
            </Label>
          </Button>
        </Card.Content>
      </Card>
    </>
  );
}
