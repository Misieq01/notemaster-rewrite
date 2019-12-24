import React, { useMemo, useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { GetToken } from "../../../../utils/tokenHandler";

import SearchIcon from "../../../../Icons/Labels/search.svg";
import AddIcon from "../../../../Icons/Labels/plus.svg";

import Label from "./Label";

const Absolute = styled.div`
  position: absolute;
  top: ${props => props.top + "px"};
  left: ${props => props.left + "px"};
  margin: auto;
`;

const Container = styled.div`
  height: auto;
  width: 200px;
  padding: 0 10px;
  background: rgb(250, 250, 250);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.16), 0 2px 4px rgba(0, 0, 0, 0.24);
  border-radius: 8px;
`;

const LabelsWrapper = styled.div`
  width: 100%;
  max-height: 240px;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 10px;
    cursor: default;
  }
  ::-webkit-scrollbar-track {
    background: #eeeeee;
  }
  ::-webkit-scrollbar-thumb {
    background: #cccccc;
  }
`;

const InputWrapper = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
`;

const Input = styled.input`
  width: 80%;
  font-size: 16px;
  padding: 10px 0;
`;

const Icon = styled.img`
  height: ${props => props.size || "15px"};
  width: ${props => props.size || "15px"};
  opacity: 0.6;
  cursor: ${props => props.cursor || "default"};
`;

const Labels = ({ parent, ...props }) => {
  const [labels, setLabels] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editSlot, setEditSlot] = useState("");

  useEffect(() => {
    const token = GetToken();
    axios
      .get("http://localhost:4000/Labels", {
        headers: { Authorization: "Bearer " + token }
      })
      .then(response => {
        setLabels(response.data);
      });
  }, [labels]);

  const [top, left] = useMemo(() => {
    const rect = parent.getBoundingClientRect();
    let y;
    let x;

    y = rect.top + rect.height + 10;
    x = rect.left - 100 + rect.width / 2;

    return [y, x];
  }, [parent]);

  const AddLabel = () => {
    const token = GetToken();
    axios
      .post(
        "http://localhost:4000/NewLabel",
        { name: inputValue },
        {
          headers: { Authorization: "Bearer " + token }
        }
      )
      .then(() => {
        setInputValue("");
      });
  };

  const RemoveLabel = id => {
    const token = GetToken();
    axios.delete("http://localhost:4000/DeleteLabel/" + id, {
      headers: { Authorization: "Bearer " + token }
    });
  };

  const ChangeLabel = (id, name) => {
    const token = GetToken();
    axios.patch("http://localhost:4000/ChangeLabel/" + id, {name}, {
      headers: { Authorization: "Bearer " + token }
    });
  };

  const displayedLabels = labels.map((e, i) => {
    return (
      <Label
        value={e.name}
        id={e._id}
        Remove={RemoveLabel}
        Change={ChangeLabel}
        editSlot={editSlot}
        SetEditSlot={setEditSlot}
        key={e._id}
      ></Label>
    );
  });

  return (
    <Absolute top={top} left={left}>
      <Container onClick={() => setEditSlot("")}>
        <InputWrapper>
          <Input
            placeholder="Type label"
            value={inputValue}
            onChange={event => setInputValue(event.target.value)}
          />
          {inputValue ? (
            <Icon
              src={AddIcon}
              cursor="pointer"
              size="18px"
              onClick={AddLabel}
            />
          ) : (
            <Icon src={SearchIcon} />
          )}
        </InputWrapper>
        <LabelsWrapper>{displayedLabels}</LabelsWrapper>
      </Container>
    </Absolute>
  );
};

export default Labels;
