import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

import { getClass, setClassId } from "../../store/class/slice";
import {
  setMessage,
  setShowAlert,
  setType,
} from "../../store/alert/alertSlice";

// import useAuthStateChanged from "../../hooks/useAuthStateChanged";

import Header from "../../components/common/Header";
import {
  ClassCrud,
  ClassDetailInfo,
  ClassInforLayout,
  Classname,
  MemberItem,
  NoCourse,
  SetItem,
} from "../../components/layout/class/index";
import { InputModal } from "../../components/input/index";
import { Modal, SetModal } from "../../components/modal/index";
import { ButtonModal } from "../../components/button";
import { domain } from "../../utils/common";

const ClassPage = () => {
  // Lấy params id của url
  const { classId } = useParams();
  const [showModalSet, setShowModalSet] = useState(false);
  const [showModalMember, setShowModalMember] = useState(false);

  const { classId: id, classInfo } = useSelector((state) => state.class);
  // console.log(classInfo);/

  // const { user } = useAuthStateChanged();
  // const navigate = useNavigate();
  const host = classInfo.createdBy?.[0];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClass(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(setClassId(classId));
  }, [dispatch, classId]);

  const handleShowModelSet = () => {
    setShowModalSet(true);
  };
  const handleShowModelMember = () => {
    setShowModalMember(true);
  };

  const schema = yup.object({
    email: yup.string().email().required("Please enter your email."),
  });
  const {
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    control,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    //mode: onChange để sử dụng đc thằng isValid (ko nó sẽ mãi mãi là false)
  });

  const onSubmitHandler = async (values) => {
    if (isValid) {
      try {
        await axios.post(
          `${domain}/api/v1/class/${classId}/member-invitation/invite`,
          {
            targetMailAddress: values.email,
          }
        );

        setShowModalMember(false);
        dispatch(setShowAlert(true));
        dispatch(setMessage("Invitation has been sent"));
        dispatch(setType("success"));
      } catch (err) {
        console.log(err);
        setShowModalMember(false);
        dispatch(setShowAlert(true));
        dispatch(setMessage(err.response.data.message));
        dispatch(setType("error"));
      }
    }
  };

  return (
    <div>
      <Header></Header>
      <div className="p-[64px]">
        <div className="mt-[50px] flex items-center justify-between">
          {/* Classname */}
          <Classname classInfo={classInfo}></Classname>
          {/* Icon */}
          <ClassCrud></ClassCrud>
        </div>
        {/* Middle */}
        <Tabs>
          <TabList className="flex mt-[18px] border-b-[3px] mb-[4px]">
            <Tab
              className="line-green mx-[16px] text-[16px] font-semibold text-[#303545] cursor-pointer"
              // Nếu Active thì có class là active
              selectedClassName="active"
            >
              Sets
            </Tab>
            <Tab
              className="line-green mx-[16px] text-[16px] font-semibold text-[#303545] cursor-pointer"
              selectedClassName="active"
            >
              Folders
            </Tab>
            <Tab
              className="line-green mx-[16px] text-[16px] font-semibold text-[#303545] cursor-pointer"
              selectedClassName="active"
            >
              Members
            </Tab>
          </TabList>
          <TabPanel>
            <div className="flex">
              {classInfo.setNum === 0 ? (
                <NoCourse word="set" onClick={handleShowModelSet}></NoCourse>
              ) : (
                <ClassDetailInfo
                  className={"grid grid-cols-3 flex-1 p-10 gap-8"}
                >
                  <SetItem></SetItem>
                  <SetItem></SetItem>
                  <SetItem></SetItem>
                  <SetItem></SetItem>
                  <SetItem></SetItem>
                </ClassDetailInfo>
              )}
              <ClassInforLayout
                hostName={host?.name}
                hostAvatar={host?.avatarUrl}
                hostEmail={host?.email}
                setNum={classInfo.setNum}
                memberNum={classInfo.memberNum}
                forlderNum={classInfo.folderNum}
              ></ClassInforLayout>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="flex">
              {classInfo.folderNum === 0 ? (
                <NoCourse word="folder"></NoCourse>
              ) : (
                <ClassDetailInfo
                  className={"grid grid-cols-3 flex-1 p-10 gap-8"}
                >
                  <SetItem></SetItem>
                </ClassDetailInfo>
              )}
              <ClassInforLayout
                hostName={host?.name}
                hostAvatar={host?.avatarUrl}
                hostEmail={host?.email}
                setNum={classInfo.setNum}
                memberNum={classInfo.memberNum}
                forlderNum={classInfo.folderNum}
              ></ClassInforLayout>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="flex items-start">
              <div className="flex-1 grid">
                {classInfo.memberNum === 1 ? (
                  <NoCourse
                    word="member"
                    onClick={handleShowModelMember}
                  ></NoCourse>
                ) : (
                  classInfo?.member?.map((memberInfo, index) => {
                    return (
                      <ClassDetailInfo key={index} className={"pt-6 px-10"}>
                        <MemberItem
                          memberInfo={memberInfo}
                          role={`${
                            host._id === memberInfo.id
                              ? "Class Admin"
                              : "Member"
                          } `}
                        ></MemberItem>
                      </ClassDetailInfo>
                    );
                  })
                )}
              </div>
              <ClassInforLayout
                hostName={host?.name}
                hostAvatar={host?.avatarUrl}
                hostEmail={host?.email}
                setNum={classInfo.setNum}
                memberNum={classInfo.memberNum}
                forlderNum={classInfo.folderNum}
              ></ClassInforLayout>
            </div>
          </TabPanel>
        </Tabs>
        {/* Course */}
      </div>
      <Modal
        showModal={showModalSet}
        handleClose={() => setShowModalSet(false)}
        title="Add a set"
      >
        <SetModal></SetModal>
      </Modal>
      <Modal
        showModal={showModalMember}
        handleClose={() => setShowModalMember(false)}
        title="Invite member in your class"
      >
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <InputModal
            id="email"
            placeHolder="Enter your email"
            text="email"
            control={control}
          ></InputModal>
          <p className="text-red-400 font-semibold mb-[10px]">
            {errors.email?.message}
          </p>
          <ButtonModal>
            {isSubmitting ? (
              <div className="w-10 h-10 rounded-full border-4 border-white border-t-transparent border-b-transparent animate-spin mx-auto"></div>
            ) : (
              "Invite member"
            )}
          </ButtonModal>
        </form>
      </Modal>
    </div>
  );
};

export default ClassPage;
