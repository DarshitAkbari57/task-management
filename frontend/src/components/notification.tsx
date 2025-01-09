import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { IoNotificationsCircle } from "react-icons/io5";

dayjs.extend(relativeTime);

const Notification = ({ notifications }: { notifications: any[] }) => {
  return (
    <div className="w-80 ssm:w-full h-full max-h-96 overflow-y-auto overflow-x-hidden scrollbar">
      <p className="font-medium border-b pb-2 mb-4 sticky top-0 bg-white">
        Notifications
      </p>
      {notifications?.length > 0 ? (
        <>
          <div className="flex flex-col gap-1">
            {notifications?.map((item) => {
              return (
                <div className="flex items-center gap-x-1 rounded-md px-1 py-2 hover:bg-gray-100 duration-300">
                  <IoNotificationsCircle className="text-3xl text-primary flex-shrink-0" />
                  <div className="flex flex-col">
                    <p className="text-sm text-black">Message</p>
                    <p className="text-xs text-neutral-400">
                      {dayjs(item?.createdAt).fromNow()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-center pt-5 pb-1 sticky bottom-0 bg-white">
            <p
              // href={'/notifications'}
              className="text-gray-800 hover:text-gray-800/80 text-sm border-b border-transparent font-medium hover:border-gray-800/60 duration-300 cursor-pointer"
            >
              View All{" "}
              {notifications?.length > 0 && `(${notifications?.length})`}
            </p>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full p-5 my-8">
          <p className="text-lg font-medium text-gray-500">No Notifications</p>
          <p className="text-sm text-gray-400 mt-2 text-center">
            You have no new notifications at the moment.
          </p>
        </div>
      )}
    </div>
  );
};

export default Notification;
