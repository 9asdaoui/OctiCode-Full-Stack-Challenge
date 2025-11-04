# Code review: api/user.ts

Login route

- The current login SQL uses string interpolation with the email and password. This is vulnerable to SQL injection. Use a parameterized query instead. For example:

  ```ts
  const result = await pool.query(
    'SELECT * FROM users WHERE email = $1 AND password = $2',
    [email, hash]
  );
  ```

- Password hashing: the code uses MD5. MD5 is not safe for passwords. Use bcrypt with a salt (bcrypt example: `await bcrypt.hash(password, 10)`).

- Sessions are stored in a global object. That won't scale and may cause memory and concurrency issues. Consider Redis-based session storage or use stateless JWTs depending on your needs.

- There is no request-body validation. Add input validation so you can fail fast and return clear errors.

Invite route

- Do not return a generated password in the HTTP response. Sending passwords in plain text is insecure. Instead, create the user in a disabled state and email a password reset link or a one-time setup link.

- The INSERT uses string interpolation and is vulnerable to SQL injection. Use a parameterized INSERT:

  ```ts
  await pool.query(
    'INSERT INTO users(email, password, role) VALUES($1, $2, $3)',
    [req.body.email, hash, 'admin']
  );
  ```

- Same password-hash recommendation as above: use bcrypt, and do not store plaintext or weakly hashed passwords.

- Role assignment should be validated and restricted. Do not allow arbitrary requests to create admin users — enforce that only existing admins can assign the admin role.

General notes

- Improve error handling and logging. Return consistent error responses and log server errors with enough context (but never log passwords).

- Consider rate limiting on authentication endpoints to reduce brute-force risks.

Suggested next steps

1. Replace raw SQL interpolation with parameterized queries.
2. Move to bcrypt for password hashing and re-hash existing passwords through a migration or reset flow.
3. Add input validation for all routes.
4. Prevent returning secrets in API responses (don't return generated passwords).
5. Restrict role-related operations to admin users and validate role values.