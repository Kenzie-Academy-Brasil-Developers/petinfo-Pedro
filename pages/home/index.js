import { renderCards } from "../../scripts/card_post.js";
import { avatarAddLogout } from "../../scripts/logout.js";
import { security } from "../../scripts/security.js";
import { getAllPosts, getUserData } from "../../scripts/api.js";
import { renderCreatePost } from "../../scripts/modal_create_post.js";

security()

const token = JSON.parse(localStorage.getItem("token"))

await avatarAddLogout(await getUserData(token))

await renderCreatePost()

await renderCards(await getAllPosts(token), await getUserData(token), token)