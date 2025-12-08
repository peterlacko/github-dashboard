## FEATURE:

Within this app implement searching for users on github by username.
Application will have logo, search bar and results page which will initially contain text that prompt user to search.
If github user is found display following information about the user from their public profile:

- Avatar
- name
- username
- Bio
- location
- website
- Statistics for: number of Public Repos | number of Followers | number of Following
- Join date - created_at
- Repos count

If user is not found display some pretty "User not found" page

Implement responsive design for mobile and desktop

Implement Light and Dark mode. Designs from figma for search bar are here
light: https://www.figma.com/design/CSKrPZ4ETBC5JY5zjRoTXn/github-user-search-app?node-id=5-351&t=BEB9oQc3q4lAGtxE-4
dark: https://www.figma.com/design/CSKrPZ4ETBC5JY5zjRoTXn/github-user-search-app?node-id=5-587&t=BEB9oQc3q4lAGtxE-4
Adjust colors for rest of the page according to these designs.

Use following icons for design:
https://www.figma.com/design/CSKrPZ4ETBC5JY5zjRoTXn/github-user-search-app?node-id=5-134&t=BEB9oQc3q4lAGtxE-4

Use following logo:
https://www.figma.com/design/CSKrPZ4ETBC5JY5zjRoTXn/github-user-search-app?node-id=3-994&t=BEB9oQc3q4lAGtxE-4

To search for user use following endpoint
GET https://api.github.com/users/{username}

## EXAMPLES:

This is API response for GET https://api.github.com/users/peterlacko
{
"login": "peterlacko",
"id": 7295540,
"node_id": "MDQ6VXNlcjcyOTU1NDA=",
"avatar_url": "https://avatars.githubusercontent.com/u/7295540?v=4",
"gravatar_id": "",
"url": "https://api.github.com/users/peterlacko",
"html_url": "https://github.com/peterlacko",
"followers_url": "https://api.github.com/users/peterlacko/followers",
"following_url": "https://api.github.com/users/peterlacko/following{/other_user}",
"gists_url": "https://api.github.com/users/peterlacko/gists{/gist_id}",
"starred_url": "https://api.github.com/users/peterlacko/starred{/owner}{/repo}",
"subscriptions_url": "https://api.github.com/users/peterlacko/subscriptions",
"organizations_url": "https://api.github.com/users/peterlacko/orgs",
"repos_url": "https://api.github.com/users/peterlacko/repos",
"events_url": "https://api.github.com/users/peterlacko/events{/privacy}",
"received_events_url": "https://api.github.com/users/peterlacko/received_events",
"type": "User",
"user_view_type": "public",
"site_admin": false,
"name": "Peter Lacko",
"company": null,
"blog": "https://github.com/peterlacko",
"location": "Slovakia",
"email": null,
"hireable": null,
"bio": "React developer with interest in FE technologies and AI.",
"twitter_username": null,
"public_repos": 22,
"public_gists": 1,
"followers": 3,
"following": 1,
"created_at": "2014-04-14T21:58:34Z",
"updated_at": "2025-12-08T14:16:56Z"
}

## DOCUMENTATION:

No external documentation should be needed for this feature

## OTHER CONSIDERATIONS:
