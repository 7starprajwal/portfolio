import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  getContacts,
  markAsRead,
  deleteContact,
} from "../../services/contactService";

import MessageStats from "../../components/messages/MessageStats";
import MessageFilters from "../../components/messages/MessageFilters";
import MessageCard from "../../components/messages/MessageCard";
import MessagePagination from "../../components/messages/MessagePagination";
import EmptyMessages from "../../components/messages/EmptyMessages";

function Messages() {
  const [messages, setMessages] = useState([]);

  const [stats, setStats] = useState({
    total: 0,
    read: 0,
    unread: 0,
  });

  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    fetchMessages();
  }, [page, search, status, sort]);

  async function fetchMessages() {
    try {
      setLoading(true);

      const response = await getContacts({
        page,
        limit: 10,
        search,
        status,
        sort,
      });

      setMessages(response.contacts);
      setStats(response.stats);
      setTotalPages(response.pagination.totalPages);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load messages."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleMarkRead(id) {
    try {
      await markAsRead(id);

      toast.success("Message marked as read.");

      fetchMessages();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to update message."
      );
    }
  }

  async function handleDelete(id) {
    try {
      await deleteContact(id);

      toast.success("Message deleted successfully.");

      fetchMessages();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete message."
      );
    }
  }

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Contact Messages
        </h1>

        <p className="mt-2 text-slate-400">
          View and manage all messages received from your portfolio.
        </p>
      </div>

      <MessageStats stats={stats} />

      <MessageFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        sort={sort}
        setSort={setSort}
      />

      {messages.length === 0 ? (
        <EmptyMessages />
      ) : (
        <div className="space-y-5">
          {messages.map((message) => (
            <MessageCard
              key={message._id}
              message={message}
              onMarkRead={handleMarkRead}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <MessagePagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}

export default Messages;