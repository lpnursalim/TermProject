import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Scanner;
import java.util.*;
import java.util.Random;

public class TermProject {

    public static void main(String[] args) {
        String url = "jdbc:mysql://db.relational-data.org:3306/imdb_ijs"; // Update with your database URL
        String username = "guest"; // Replace with your MySQL username
        String password = "relational"; // Replace with your MySQL password
        PreparedStatement prepStmt1 = null;
        PreparedStatement prepStmt2 = null;
        PreparedStatement prepStmt3 = null;

        Map<String, String> Mood = new HashMap<>();
        Mood.put("Curious", "Documentary");
        Mood.put("Briefly Engaging", "Short");
        Mood.put("Lighthearted", "Comedy");
        Mood.put("Tense", "Crime");
        Mood.put("Rugged", "Western");
        Mood.put("Heartwarming", "Family");
        Mood.put("Imaginative", "Animation");
        Mood.put("Intense", "Drama");
        Mood.put("Affectionate", "Romance");
        Mood.put("Intrigued", "Mystery");
        Mood.put("Edgy", "Thriller");
        Mood.put("Provocative", "Adult");
        Mood.put("Rhythmic", "Music");
        Mood.put("Excited", "Action");
        Mood.put("Wondrous", "Fantasy");
        Mood.put("Futuristic", "Sci-Fi");
        Mood.put("Fearful", "Horror");
        Mood.put("Solemn", "War");
        Mood.put("Upbeat", "Musical");
        Mood.put("Adventurous", "Adventure");
        Mood.put("Moody", "Film-Noir");


        String query1 = "select " +
                "count(*), top.director_fn, top.director_ln, top.actor_fn, top.actor_ln, top.genre " +
                "from (select d.first_name as director_fn, " +
                "d.last_name as director_ln, " +
                "a.first_name as actor_fn, " +
                "a.last_name as actor_ln, " +
                "g.genre " +
                "from " +
                "(select count(*), " +
                "mg.genre " +
                "from " +
                "movies m, " +
                "movies_genres mg " +
                "where " +
                "mg.movie_id = m.id " +
                "and mg.genre = ? " +
                "and m.rank > 8 " +
                "group by " +
                "mg.genre " +
                "order by count(*) desc LIMIT 3) g, " +
                "movies m, " +
                "actors a, " +
                "roles r, " +
                "movies_directors md, " +
                "directors d, " +
                "movies_genres mg " +
                "where " +
                "mg.genre = g.genre " +
                "and md.director_id = d.id " +
                "and md.movie_id = mg.movie_id " +
                "and m.id = mg.movie_id " +
                "and r.actor_id = a.id " +
                "and r.movie_id = mg.movie_id " +
                "and m.rank > 8) top " +
                "group by top.director_fn, top.director_ln, top.actor_fn, top.actor_ln, top.genre " +
                "order by count(*) desc LIMIT 10";

        String query2 = "SELECT distinct " +
                "m.name AS movie_name, " +
                "d.first_name AS director_fn, " +
                "d.last_name AS director_ln, " +
                "m.rank AS ranked " +
                "from " +
                "movies m, " +
                "movies_directors md, " +
                "directors d, " +
                "actors a, " +
                "roles r, " +
                "movies_genres mg " +
                "where " +
                "m.id = md.movie_id " +
                "and md.director_id = d.id " +
                "and m.id = r.movie_id " +
                "and r.actor_id = a.id " +
                "and mg.movie_id = m.id " +
                "and m.rank > 3 " +
                "and (a.first_name, a.last_name, d.first_name, d.last_name, mg.genre) in " +
                "(select a.first_name, " +
                "a.last_name, " +
                "d.first_name, " +
                "d.last_name, " +
                "mg.genre " +
                "from " +
                "movies m, " +
                "actors a, " +
                "directors d, " +
                "movies_directors md, " +
                "roles r, " +
                "movies_genres mg " +
                "where " +
                "d.id = md.director_id " +
                "and md.movie_id = m.id " +
                "and m.id = r.movie_id " +
                "and r.actor_id = a.id " +
                "and mg.movie_id = m.id " +
                "and m.name = ?) " +
                "and m.name != ? " +
                "order by " +
                "m.rank desc " +
                "limit 10";

        String query3 = "(" +
                "SELECT DISTINCT " +
                "m.name AS movie_name, " +
                "d.first_name AS director_fn, " +
                "d.last_name AS director_ln, " +
                "m.rank AS ranked " +
                "FROM " +
                "movies m, " +
                "movies_directors md, " +
                "directors d, " +
                "movies_genres mg " +
                "WHERE " +
                "m.id = md.movie_id " +
                "AND md.director_id = d.id " +
                "AND mg.movie_id = m.id " +
                "AND m.rank > 5 " +
                "AND d.first_name = ? " +
                "AND d.last_name = ? " +
                "ORDER BY " +
                "m.rank DESC " +
                "LIMIT 3 " +
                ") " +
                "UNION ALL " +
                "(" +
                "SELECT DISTINCT " +
                "m.name AS movie_name, " +
                "d.first_name AS director_fn, " +
                "d.last_name AS director_ln, " +
                "m.rank AS ranked " +
                "FROM " +
                "movies m, " +
                "movies_directors md, " +
                "directors d, " +
                "movies_genres mg " +
                "WHERE " +
                "m.id = md.movie_id " +
                "AND md.director_id = d.id " +
                "AND mg.movie_id = m.id " +
                "AND m.rank < 5 " +
                "AND d.first_name = ? " +
                "AND d.last_name = ? " +
                "ORDER BY " +
                "m.rank DESC " +
                "LIMIT 3 " +
                ")";

        Scanner scan = new Scanner (System.in);
        System.out.println();
        System.out.println(" Q U E R Y  1 ");
        System.out.println();


        try {
            Connection connection = DriverManager.getConnection(url, username, password);
            //Statement stmt = conn.createStatement();
            prepStmt1 = connection.prepareStatement(query1);
            //ResultSet rs = prepStmt1.executeQuery(query1);

            System.out.println("Welcome to the movie recommendation/exploration app! Enter a mood, we can find movies based off that. (Curious, Briefly Engaging, Lighthearted, Tense, Rugged, Heartwarming, Imaginative, Intense, Affectionate, Intrigued, Edgy, Provocative, Rhythmic, Excited, Wondrous, Futuristic, Fearful, Solemn, Upbeat, Adventurous, Moody)");
            String mood_input = scan.nextLine().trim();
            String genre_input = Mood.get(mood_input);

            // Here, i am changing up the response, so it is different every time.
            String [] sentences_1_intro = {
                    "There are some amazing movies that fit your mood! Lets find the best ones.",
                    "Based on your mood, I think you will really like these options. Take a look!",
                    "Let's find the best directors and actors based on the mood you are in! We can find movies from there."
            };
            Random random = new Random();
            int randomIndex = random.nextInt(sentences_1_intro.length);
            System.out.println(sentences_1_intro[randomIndex]);
            System.out.println();
            // response generator

            prepStmt1.setString(1, genre_input);

            ResultSet rs = prepStmt1.executeQuery();
            // Check if the result set is empty
            if (!rs.isBeforeFirst()) {
                System.out.println("Error");
            } else {
                // Process and display the results
                while (rs.next()) {
                    float numOfMovies = rs.getInt("count(*)");
                    String directorFirstName = rs.getString("top.director_fn");
                    String directorLastName = rs.getString("top.director_ln");
                    String actorFirstName = rs.getString("top.actor_fn");
                    String actorLastName = rs.getString("top.actor_ln");
                    String genre = rs.getString("top.genre");

                    System.out.println(" Number Of Movies: " + numOfMovies + " Director: " + directorFirstName + " " + directorLastName + " Actors: " + actorFirstName + " " + actorLastName + " Genre: " + genre);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        // Here, i am changing up the response, so it is different every time.
        System.out.println();
        String [] sentences_1_outro = {
                "Do any of these Directors/Actors interest you? They are the best of the best! If so, please enter the following info.",
                "Based on your mood, these Director/Actor pairings are the cream of the crop in your genre. If you are interested in any of these directors, go ahead and continue the prompts.",
                "Did you know that based on your mood, these Directors/Actors made the best movies for you? Go ahead and choose a director to explore more about!"
        };
        Random random = new Random();
        int randomIndex = random.nextInt(sentences_1_outro.length);
        System.out.println(sentences_1_outro[randomIndex]);
        System.out.println();
        // response generator

        System.out.println();
        System.out.println(" Q U E R Y  3 ");
        System.out.println();

        try {
            Connection connection = DriverManager.getConnection(url, username, password);
            //Statement stmt = conn.createStatement();
            prepStmt3 = connection.prepareStatement(query3);
            //ResultSet rs = prepStmt1.executeQuery(query1);

            System.out.println("Enter a director first name");
            String director_fn = scan.nextLine();
            System.out.println("Enter a director last name");
            String director_ln = scan.nextLine();

            // Here, i am changing up the response, so it is different every time.
            System.out.println();
            String [] sentences_2_intro = {
                    "Wow! They really are a great Director. Lets find 3 their best and worse movies, I can help you decide what to watch from there!",
                    "That is an excellent choice! Lets see their best and worst films, and make a decision from there.",
                    "This Director's movies were made for you! Lets see some of their best ranked films and decide waht movie to watch from there."
            };
            randomIndex = random.nextInt(sentences_2_intro.length);
            System.out.println(sentences_2_intro[randomIndex]);
            System.out.println();
            // response generator

            prepStmt3.setString(1, director_fn);
            prepStmt3.setString(2, director_ln);
            prepStmt3.setString(3, director_fn);
            prepStmt3.setString(4, director_ln);

            ResultSet rs = prepStmt3.executeQuery();

            // Check if the result set is empty
            if (!rs.isBeforeFirst()) {
                System.out.println("Error");
            } else {
                // Process and display the results
                while (rs.next()) {
                    String movieName = rs.getString("movie_name");
                    String directorFirstName = rs.getString("director_fn");
                    String directorLastName = rs.getString("director_ln");
                    float rank = rs.getFloat("ranked");

                    System.out.println(" Movie: " +  movieName + " Director: " + directorFirstName + " " +  directorLastName + " rank: " +  rank);
                }
            }
            // Here, i am changing up the response, so it is different every time.
            System.out.println();
            String [] sentences_2_outro = {
                    "Here are some of this director's best and worst movies, take a look and pick one! If you enjoy it, let me know and I will recommend similar ones by this director.",
                    "See any interesting films? Go ahead and give it a watch! Let me know the name of the movie, and I will find other highly ranked movies by this director.",
                    "All of these look so interesting! If you watch one and want more recommendations based on this director, let me know!"
            };
            randomIndex = random.nextInt(sentences_2_outro.length);
            System.out.println(sentences_2_outro[randomIndex]);
            System.out.println();
            // response generator

        } catch (SQLException e) {
            e.printStackTrace();
        }
        System.out.println();
        System.out.println(" Q U E R Y  2 ");
        System.out.println();


        try{
            Connection connection = DriverManager.getConnection(url, username, password);
            //Statement stmt = conn.createStatement();
            prepStmt2 = connection.prepareStatement(query2);
            //ResultSet rs = prepStmt1.executeQuery(query1);

            System.out.println("Enter a movie name:");
            String movie_name_input = scan.nextLine();

            prepStmt2.setString(1, movie_name_input);
            prepStmt2.setString(2, movie_name_input);

            // Here, i am changing up the response, so it is different every time.
            System.out.println();
            String [] sentences_3_intro = {
                    "I'm glad you liked the film, here are some more recommendations.",
                    "If you liked that movie, I think you will love these!",
                    "I just know you will like these movies as well!"
            };
            randomIndex = random.nextInt(sentences_3_intro.length);
            System.out.println(sentences_3_intro[randomIndex]);
            System.out.println();
            // response generator

            ResultSet rs = prepStmt2.executeQuery();

            // Check if the result set is empty
            if (!rs.isBeforeFirst()) {
                System.out.println("Error: The movie does not exist in the database.");
            } else {
                // Process and display the results
                while (rs.next()) {
                    String movieName = rs.getString("movie_name");
                    String directorFirstName = rs.getString("director_fn");
                    String directorLastName = rs.getString("director_ln");
                    float rank = rs.getFloat("ranked");

                    System.out.println(" Movie: " +  movieName + " Director: " + directorFirstName + " " +  directorLastName + " rank: " +  rank);
                }
            }
            System.out.println();
            System.out.println("I hope you learned about some directors/actor, and found some movies you liked!");

        } catch (SQLException e) {
            e.printStackTrace();
        }

    }
}
